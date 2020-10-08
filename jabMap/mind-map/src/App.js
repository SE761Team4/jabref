import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import MindMap from './MindMap';
import ToolBar from './ToolBar';
import ReferencesTable from './ReferencesTable';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [nodes, setNodes] = useState([{
    id: 'node1',
    x: 100,
    y: 100,
    colors: '',
    isInSerchRet :false
  },
  {
    id: 'node2',
    x: 200,
    y: 200,
    colors: '',
    isInSerchRet :false
  },{
    id: 'node3',
    x: 300,
    y: 300,
    colors: '',
    isInSerchRet :false
  }]);

  const [edges, setEdges] = useState([{
    id: 'edge1',
    startId: nodes[0].id,
    startX:  nodes[0].x,
    startY: nodes[0].y,
    endId: nodes[1].id,
    endX: nodes[1].x,
    endY: nodes[1].y
  },
  {
    id: 'edge2',
    startId: nodes[1].id,
    startX:  nodes[1].x,
    startY: nodes[1].y,
    endId: nodes[2].id,
    endX: nodes[2].x,
    endY: nodes[2].y
  }
  ]);

  const [references, setReferences] = useState([{}]);

  const [selectedNodeId, setSelectedNodeId] = useState("");

  const [globalNodeIdCounter, setGlobalNodeIdCounter] = useState(4);

  const getNodeById = (id) => {
      for (var node of nodes) {
          if ((node.id) === id) {
              return node;
          }
      }
  }

  const updateNode = (id, x, y) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        const updatedNode = {
          ...node,
          x: x,
          y: y,
        }
        return updatedNode;
      } else {
        return node;
      }
    });
    setNodes(newNodes);
  }

  const updateNodeColor = (nd, newColor) => {
    const newNodes = nodes.map((node) => {

      if (nd.indexOf(node.id)>-1) {
        const updatedNode = {
          ...node,
          colors: newColor
        }
        return updatedNode;
      } else {
        if(node.colors=="")
          node.colors = 'white';
        return node;
      }
    });
    setNodes(newNodes);
  }
  
  var updateSearchIndex = (idx) => {

    nodes.forEach(n => {
      if(idx.indexOf(n.id) >-1){
        n.isInSerchRet = true;
      }
      else
      {
        n.isInSerchRet = false;
      }
      updateNode(n.id,n.x,n.y)
      
    });

  }

  const updateEdges = (id, x, y) => {
      const newEdges = edges.map((edge) => {
          if (edge.startId === id) {
              const updatedEdge = {
                  ...edge,
                  startX: x,
                  startY: y
                };
              return updatedEdge;
          }
          if (edge.endId === id) {
              const updatedEdge = {
                  ...edge,
                  endX: x,
                  endY: y
                };
              return updatedEdge;
          }
          return edge;
      })
      setEdges(newEdges);
  }

    //Styles
    const useStyles = makeStyles({
        wrapper: {
            position: "relative",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <ReferencesTable references={references} setReferences={setReferences}></ReferencesTable>
            <ToolBar 
              nodes={nodes} 
              edges={edges} 
              getNodeById={getNodeById} 
              selectedNodeId={selectedNodeId} 
              setNodes={setNodes} 
              setEdges={setEdges} 
              globalNodeIdCounter={globalNodeIdCounter} 
              setGlobalNodeIdCounter={setGlobalNodeIdCounter}
              updateNodeColor = {updateNodeColor}
              updateSearchIndex = {updateSearchIndex}
            />
            <MindMap nodes={nodes} edges={edges} updateEdges={updateEdges} updateNode={updateNode} selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId}  updateSearchIndex = {updateSearchIndex}/>
        </div>
      );
    }

export default App;
