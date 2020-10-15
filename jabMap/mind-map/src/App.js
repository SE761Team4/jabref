import React, {
    useEffect,
    useRef,
    useState
} from "react";
import "./App.css";
import MindMap
    from "./components/MindMap";
import {
    Layer,
    Stage
} from 'react-konva';
import useWindowDimensions
    from './WindowDimensions';
import ToolBar
    from "./components/ToolBar";
import NodeInfoPanel
    from "./components/NodeInfoPanel";
import ReferencesTable
    from "./components/ReferencesTable";
import {IconTypes} from "./enums/IconTypes";

function App() {

    const [nodes, setNodes] = useState([]);

    const [edges, setEdges] = useState([]);

    const [references, setReferences] = useState([{}]);

    const [selectedNode, setSelectedNode] = useState({});

    const [linking, setLinking] = useState(false);

    const [unlinking, setUnlinking] = useState(false);

    /**
     * Fetch data on component mount
     */
    useEffect(() => {
        fetchReferences();
        fetchMap();
    }, []);

    /**
     * Get mind map nodes and edges from Jabref to load a saved map.
     */
    const fetchMap = async () => {
        fetch("http://localhost:9898/libraries/current/map")
            .then((res) => res.json())
            .then((data) => {
                setNodes(data.nodes.map(node => {
                    if (node.id === -1) {
                        return {
                            ...node,
                            x_pos: windowWidth / 8,
                            y_pos: windowHeight / 3
                        }
                    } else {
                        return node;
                    }
                }));
                setEdges(
                    data.edges.map(edge => {
                        let node1 = data.nodes.find(node => node.id === edge.node1_Id);
                        let node2 = data.nodes.find(node => node.id === edge.node2_Id);
                        return {
                            startId: edge.node1_Id,
                            startX: node1.x_pos,
                            startY: node1.y_pos,
                            endId: edge.node2_Id,
                            endX: node2.x_pos,
                            endY: node2.y_pos,
                        };
                    }));
            })
            .catch(console.log);
    }

    /**
     * Get references from Jabref to be displayed in the sidebar.
     */
    const fetchReferences = async () => {
        fetch("http://localhost:9898/libraries/current/entries")
            .then((res) => res.json())
            .then((data) => {
                setReferences(data);
            })
            .catch(console.log);
    }



    /**
     * Save mind map nodes and edges to Jabref.
     */
    const saveMap = () => {
        const convertedEdges = edges.map(edge => {
            return {
                node1_Id: edge.startId,
                node2_Id: edge.endId
            }
        });
        const payload = JSON.stringify({
            "nodes": nodes,
            "edges": convertedEdges
        });
        fetch('http://localhost:9898/libraries/current/map', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
    }

    /**
     * Link or unlink from the selected node.
     */
    const handleSelected = (selected) => {
        if (!linking && !unlinking) {
            setSelectedNode(selected);
        } else if (unlinking) {
            removeEdge(selectedNode, selected);
            setUnlinking(false);
        } else if (linking) {
            addEdge(selectedNode, selected);
            setLinking(false);
            setSelectedNode(selected);
        }
    }

    /**
     * Delete an edge between two nodes
     */
    const removeEdge = (startNode, endNode) => {
        let filteredEdges = edges.filter((edge) => {
            return (edge.startId === startNode.id && edge.endId === endNode.id) || (edge.startId === endNode.id && edge.endId === startNode.id)
        });
        setEdges(edges.filter((edge) => {
            return !filteredEdges.includes(edge)
        }));
    }

    /**
     * Update a node with same id as the new node passed in.
     */
    const updateNode = (newNode) => {
        const newNodes = nodes.map((node) => {
            if (newNode.id === node.id) {
                return newNode;
            } else {
                return node;
            }
        });
        setNodes(newNodes);
    };

    /**
     * Update the colour of the node with nodeId.
     */
    const updateNodeColor = (nodeId, newColor) => {
        const newNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    colour: newColor
                };
            }
            return node;
        });
        setNodes(newNodes);
    }

    /**
     * Mark nodes in search
     */
    const updateSearchIndex = (idx) => {
        nodes.forEach(node => {
            if (idx.indexOf(node.id) > -1) {
                node.isInSearch = true;
            } else {
                node.isInSearch = false;
            }
            updateNode(node)
        });
    }

    /**
     * Update edges when attached nodes are moved.
     */
    const updateEdges = (id, x, y) => {
        const newEdges = edges.map((edge) => {
            if (edge.startId === id) {
                return {
                    ...edge,
                    startX: x,
                    startY: y,
                };
            }
            if (edge.endId === id) {
                return {
                    ...edge,
                    endX: x,
                    endY: y,
                };
            }
            return edge;
        });
        setEdges(newEdges);
    };

    /**
     * Add nodes in search to search result
     */
    const searchNodes = (event) => {
        const searchTerm = event.target.value;
        const searchResult = [];
        if (searchTerm === '') {
            updateSearchIndex(searchResult)
            return;
        }
        nodes.forEach((node) => {
            if (node.label.indexOf(searchTerm) > -1) {
                searchResult.push(node.id);
            }
        });
        updateSearchIndex(searchResult)
    }

    /**
     * Change the colour of the selected node.
     */
    const changeNodeColor = (color) => {
        updateNodeColor(selectedNode.id, color.hex);
    }

    /**
     * Add a node with an edge connected to the selected node.
     */
    const addNode = (bibData, x_pos, y_pos) => {
        if (selectedNode.id !== undefined) {
            let nodeLabel;
            let bibEntryId;
            if (bibData === undefined) {
                nodeLabel = `New Node`
            } else {
                bibEntryId = bibData.citekey;
                nodeLabel = bibData.title;
            }
            if (x_pos === undefined) {
                x_pos = 0;
            }
            if (y_pos === undefined) {
                y_pos = 400;
            }
            const newNode = {
                id: Math.floor(Math.random() * 1000000000),
                label: nodeLabel,
                x_pos: x_pos,
                y_pos: y_pos,
                citationKey: bibEntryId,
                icons: [IconTypes.TO_READ, IconTypes.LOW_PRIORITY, IconTypes.NOT_FAVOURITE]
            }

            setNodes([...nodes, newNode]);
            addEdge(selectedNode, newNode);
            handleSelected(newNode);
        }
    }

    /**
     * Add an edges between two nodes. Stores the id of each node so it updates when nodes move.
     */
    const addEdge = (node1, node2) => {
        if (node1.id !== node2.id) {
            const newEdge = {
                startId: node1.id,
                startX: node1.x_pos,
                startY: node1.y_pos,
                endId: node2.id,
                endX: node2.x_pos,
                endY: node2.y_pos
            }
            setEdges([...edges, newEdge])
        }
    }

    /**
     * Delete the selected node and all attached edges.
     */
    const deleteNode = () => {
        if (selectedNode.id !== undefined && selectedNode.id !== -1) {
            setNodes(nodes.filter((node) => {
                return node.id !== selectedNode.id
            }));
            setEdges(edges.filter((edge) => {
                return edge.startId !== selectedNode.id && edge.endId !== selectedNode.id
            }));
            setSelectedNode(nodes[0]);
        }
    }

    const getReferenceById = (id) => {
        for (const reference of references) {
            if (reference.citekey === id) {
                return reference;
            }
        }
    }

    //Refs to access properties of Konva Elements
    const layerRef = useRef();
    const stageRef = useRef();
    const draggedRow = useRef();

    //Window dimensions to set canvas width and height
    const {windowHeight, windowWidth} = useWindowDimensions();

    return (
        <div
            className="container">
            <ReferencesTable
                draggedRow={draggedRow}
                addNode={addNode}
                references={references}
                setReferences={setReferences}
                className="references"
            />
            <div
                className="map-container">
                <ToolBar
                    selectedNode={selectedNode}
                    updateNode={updateNode}
                    addNode={addNode}
                    saveMap={saveMap}
                    deleteNode={deleteNode}
                    searchNodes={searchNodes}
                    linking={linking}
                    setLinking={setLinking}
                    unlinking={unlinking}
                    setUnlinking={setUnlinking}
                />
                <div
                    onDrop={e => {
                        stageRef.current.setPointersPositions(e);
                        const {x, y} = stageRef.current.getPointerPosition();
                        addNode(draggedRow.current, x - windowHeight * 0.25 - 75, y);
                    }}
                    onDragOver={e => e.preventDefault()}
                >
                    <Stage
                        style={{
                            left: "25%",
                            position: "absolute",
                            top: "72px",
                            margin: 0,
                            padding: 0
                        }}
                        width={windowWidth * 0.75}
                        height={windowHeight - 75}
                        ref={stageRef}>
                        <Layer
                            ref={layerRef}>
                            <MindMap
                                nodes={nodes}
                                edges={edges}
                                updateEdges={updateEdges}
                                updateNode={updateNode}
                                selectedNodeId={selectedNode.id}
                                setSelectedNode={handleSelected}
                                updateSearchIndex={updateSearchIndex}
                            />
                        </Layer>
                    </Stage>
                </div>
                {selectedNode.id ?
                    <NodeInfoPanel
                        node={selectedNode}
                        reference={getReferenceById(selectedNode.citationKey)}
                        updateNode={updateNode}
                        changeNodeColor={changeNodeColor}/> :
                    <NodeInfoPanel
                        node={selectedNode}
                        updateNode={updateNode}/>}
            </div>
        </div>
    );
}

export default App;
