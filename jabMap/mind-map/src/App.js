import React, {
    useState,
    useEffect,
    useRef
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
import NodeInfoPanel
    from "./NodeInfoPanel";

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

  const [selectedNode, setSelectedNode] = useState({});

  const [globalNodeIdCounter, setGlobalNodeIdCounter] = useState(4);

    const getNodeById = (id) => {
        return nodes.find(node => (node.id === id));
    };

  const getReferenceById = (id) => {
      for (const reference of references) {
          if (reference.citekey === id) {
              return reference;
          }
      }
  }

  const updateNode = (newNode) => {
    const newNodes = nodes.map((node) => {
      if (newNode.id == node.id) {
        return newNode;
      } else {
        return node;
      }
    });
    setNodes(newNodes);
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
        fetch("http://localhost:9898/libraries/current/map")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNodes(data.nodes);
                setEdges(
                data.edges.map(edge => {
                    let node1 = data.nodes.find(node => node.id === edge.node1_Id);
                    console.log(node1);
                    let node2 = data.nodes.find(node => node.id === edge.node2_Id);
                    console.log(node2);
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
        fetch("http://localhost:9898/libraries/current/entries")
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
        fetch('http://localhost:9898/libraries/current/map', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
    }

    const addNode = (bibData, x_pos, y_pos) => {
        if (selectedNode.id !== undefined) {
            console.log(selectedNode)
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
                citationKey: bibEntryId
            }

        setNodes([...nodes, newNode]);

            const newEdge = {
                startId: selectedNode.id,
                startX: selectedNode.x_pos,
                startY: selectedNode.y_pos,
                endId: newNode.id,
                endX: newNode.x_pos,
                endY: newNode.y_pos
            }

        setEdges([...edges, newEdge])
    }
  }

    const deleteNode = () => {
        if (selectedNode.id !== undefined) {
            setNodes(nodes.filter((node) => {return node.id !== selectedNode.id}));
            setEdges(edges.filter((edge) => { return edge.startId !== selectedNode.id && edge.endId !== selectedNode.id }));
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
              deleteNode={deleteNode}
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
                        selectedNodeId={selectedNode.id}
                        setSelectedNode={setSelectedNode}
                    />
                </Layer>
            </Stage>
            {selectedNode.id ? <NodeInfoPanel node={selectedNode} reference={getReferenceById(selectedNode.citationKey)} updateNode={updateNode}/> :
                <NodeInfoPanel node={selectedNode} updateNode={updateNode}/>}

        </div>
    );
}

export default App;
