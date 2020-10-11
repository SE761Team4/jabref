import React, {
    useState,
    useEffect,
    useRef
} from "react";
//import logo from "./logo.svg";
import "./App.css";
import MindMap from "./MindMap";
import ToolBar from "./ToolBar";
import KonvaReferencesTable
    from "./KonvaReferencesTable";
import NodeInfoPanel
    from "./NodeInfoPanel";
import ReferencesTable from "./ReferencesTable";
import { makeStyles } from "@material-ui/core/styles";
import { Stage, Layer } from 'react-konva';
import uuid from 'react-uuid'
import useWindowDimensions from './WindowDimensions';

function App() {
    const [nodes, setNodes] = useState([
        {
            id: "node1",
            label: "dogs",
            x: 100,
            y: 100,
        },
        {
            id: "node2",
            label: "cats",
            x: 200,
            y: 200,
        },
        {
            id: "node3",
            label: "fish",
            x: 300,
            y: 300
        },
    ]);

  const [edges, setEdges] = useState([
    {
      id: "edge1",
      startId: nodes[0].id,
      startX: nodes[0].x,
      startY: nodes[0].y,
      endId: nodes[1].id,
      endX: nodes[1].x,
      endY: nodes[1].y,
    },
    {
      id: "edge2",
      startId: nodes[1].id,
      startX: nodes[1].x,
      startY: nodes[1].y,
      endId: nodes[2].id,
      endX: nodes[2].x,
      endY: nodes[2].y,
    },
  ]);

  const [references, setReferences] = useState([{}]);

  const [selectedNode, setSelectedNode] = useState({});

  const [globalNodeIdCounter, setGlobalNodeIdCounter] = useState(4);

  const getNodeById = (id) => {
    for (var node of nodes) {
      if (node.id == id) {
        return node;
      }
    }
  };

  const getReferenceById = (id) => {
      for (const reference of references) {
          if (reference.type.key == id) {
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
      if (edge.startId == id) {
        const updatedEdge = {
          ...edge,
          startX: x,
          startY: y,
        };
        return updatedEdge;
      }
      if (edge.endId == id) {
        const updatedEdge = {
          ...edge,
          endX: x,
          endY: y,
        };
        return updatedEdge;
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

  const fetchReferences = async () => {
    fetch("/libraries/current/entries")
    .then((res) => res.json())
    .then((data) => {
        //console.log(data);
        setReferences(data);
    })
    .catch(console.log);
  }

  useEffect(() => {
    fetchReferences();
  }, []);

  const addNode = (bibData, x, y) => {
    if (selectedNode.id !== "") {
        let nodeLabel;
        let bibEntryId;
        if (bibData === undefined) {
            nodeLabel = `new node`
        } else {
            bibEntryId = bibData.type.key
            nodeLabel = bibData.title;
        }
        if (x === undefined) {
            x = 400;
        }
        if (y === undefined) {
            y = 400;
        }
        const newNode = {
            id: uuid(),
            label: nodeLabel,
            x: x,
            y: y,
            bibEntryId: bibEntryId
        }
        setGlobalNodeIdCounter(globalNodeIdCounter + 1);

        setNodes([...nodes, newNode]);

        const newEdge = {
            startId: selectedNode.id,
            startX:  selectedNode.x,
            startY: selectedNode.y,
            endId: newNode.id,
            endX: newNode.x,
            endY: newNode.y
        }

        setEdges([...edges, newEdge])
    }
  }

  const layerRef = useRef();
  const stageRef = useRef();

  const { windowHeight, windowWidth } = useWindowDimensions();

    return (
    <div className={classes.wrapper}>
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
      />
      <Stage width={windowWidth} height={windowHeight} ref={stageRef}>
        <Layer ref={layerRef}>
            <KonvaReferencesTable references={references} setReferences={setReferences} addNode={addNode} layerRef={layerRef} stageRef={stageRef}/>
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
        {selectedNode.id ? <NodeInfoPanel node={selectedNode} reference={getReferenceById(selectedNode.bibEntryId)} updateNode={updateNode}/> :
            <NodeInfoPanel node={selectedNode} updateNode={updateNode}/>}

    </div>
  );
}

export default App;
