import React, {
    useEffect,
    useRef,
    useState
} from "react";
//import logo from "./logo.svg";
import "./App.css";
import MindMap
    from "./MindMap";
import KonvaReferencesTable
    from "./KonvaReferencesTable";
import {makeStyles} from "@material-ui/core/styles";
import {
    Layer,
    Stage
} from 'react-konva';
import useWindowDimensions
    from './WindowDimensions';
import ToolBar
    from "./ToolBar";

function App() {
    const [nodes, setNodes] = useState([
        // {
        //     id: "node1",
        //     label: "dogs",
        //     x: 100,
        //     y: 100,
        // },
        // {
        //     id: "node2",
        //     label: "cats",
        //     x: 200,
        //     y: 200,
        // },
        // {
        //     id: "node3",
        //     label: "fish",
        //     x: 300,
        //     y: 300,
        // },
    ]);

    const [edges, setEdges] = useState([
        // {
        //     id: "edge1",
        //     startId: nodes[0].id,
        //     startX: nodes[0].x,
        //     startY: nodes[0].y,
        //     endId: nodes[1].id,
        //     endX: nodes[1].x,
        //     endY: nodes[1].y,
        // },
        // {
        //     id: "edge2",
        //     startId: nodes[1].id,
        //     startX: nodes[1].x,
        //     startY: nodes[1].y,
        //     endId: nodes[2].id,
        //     endX: nodes[2].x,
        //     endY: nodes[2].y,
        // },
    ]);

    const [references, setReferences] = useState([{}]);

    const [selectedNodeId, setSelectedNodeId] = useState("");

    const [globalNodeIdCounter, setGlobalNodeIdCounter] = useState(4);

    const getNodeById = (id) => {
        return nodes.find(node => (node.id === id));
    };

    const updateNode = (id, x, y) => {
        const newNodes = nodes.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    x_pos: x,
                    y_pos: y,
                };
            } else {
                return node;
            }
        });
        setNodes(newNodes);
        console.log(nodes);
    };

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

    //Styles
    const useStyles = makeStyles({
        wrapper: {
            position: "relative",
        },
        canvas: {
            left: "25%",
            position: "absolute"
        },
    });
    const classes = useStyles();

    const fetchMap = async () => {
        fetch("/libraries/current/map")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNodes(data.nodes);
                setEdges(
                data.edges.map(edge => {
                    var node1 = data.nodes.find(node => node.id === edge.node1_Id);
                    var node2 = data.nodes.find(node => node.id === edge.node2_Id);
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

    const fetchReferences = async () => {
        fetch("/libraries/current/entries")
            .then((res) => res.json())
            .then((data) => {
                setReferences(data);
            })
            .catch(console.log);
    }

    useEffect(() => {
        fetchReferences();
        fetchMap();
    }, []);

    const saveMap = () => {
        console.log(nodes);
        var convertedEdges = edges.map(edge => {
            return {
                node1_Id: edge.startId,
                node2_Id: edge.endId
            }
        })
        var payload = JSON.stringify({
            "nodes" : nodes,
            "edges" : convertedEdges
        })
        console.log(payload);
        fetch('/libraries/current/map', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
    }

    const addNode = (bibData, x_pos, y_pos) => {
        if (selectedNodeId !== "") {
            let nodeLabel;
            if (bibData === undefined) {
                nodeLabel = `New Node`
            } else {
                nodeLabel = bibData.title;
            }
            if (x_pos === undefined) {
                x_pos = 0;
            }
            if (y_pos === undefined) {
                y_pos = 400;
            }
            const newNode = {
                id: globalNodeIdCounter,
                label: nodeLabel,
                x_pos: x_pos,
                y_pos: y_pos
            }
            console.log(newNode);
            setGlobalNodeIdCounter(globalNodeIdCounter + 1);

            setNodes([...nodes, newNode]);
            const selectedNode = getNodeById(selectedNodeId);
            const newEdge = {
                startId: selectedNode.id,
                startX: selectedNode.x_pos,
                startY: selectedNode.y_pos,
                endId: newNode.id,
                endX: newNode.x_pos,
                endY: newNode.y_pos
            }
            setEdges([...edges, newEdge])
            console.log(nodes);
        }
    }

    const layerRef = useRef();
    const stageRef = useRef();

    const {windowHeight, windowWidth} = useWindowDimensions();

    return (
        <div
            className={classes.wrapper}>
            {/* <ReferencesTable
        references={references}
        setReferences={setReferences}
      ></ReferencesTable> */}
            {/* <ToolBar
        nodes={nodes}
        edges={edges}
        getNodeById={getNodeById}
        selectedNodeId={selectedNodeId}
        setNodes={setNodes}
        setEdges={setEdges}
        globalNodeIdCounter={globalNodeIdCounter}
        setGlobalNodeIdCounter={setGlobalNodeIdCounter}
      /> */}
            <ToolBar
              addNode={addNode}
              saveMap={saveMap}
            />
            <Stage
                width={windowWidth}
                height={windowHeight}
                ref={stageRef}>
                <Layer
                    ref={layerRef}>
                    <KonvaReferencesTable
                        references={references}
                        setReferences={setReferences}
                        addNode={addNode}
                        layerRef={layerRef}
                        stageRef={stageRef}/>
                    <MindMap
                        nodes={nodes}
                        edges={edges}
                        updateEdges={updateEdges}
                        updateNode={updateNode}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
