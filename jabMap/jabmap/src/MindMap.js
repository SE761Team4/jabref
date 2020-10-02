import React, { Component, useContext, useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Node from "./components/Node";
import Edge from "./components/Edge";
import ReferenceList from "./components/sidebar";
import { Editor } from "./components/toolbar.jsx";
import { Button } from "@material-ui/core";
import { SelectedContextProvider } from './context/SelectedContext';
import { Stage, Layer } from 'react-konva';



const MindMap = () => {
  const references = [
      {
        author: "An author",
        title: "A paper",
        year: 2010,
      },
      {
        author: "The author",
        title: "The paper",
        year: 2011,
      },
      {
        author: "Author 1",
        title: "A book",
        year: 2010,
      },
      {
        author: "Famous author",
        title: "An article",
        year: 2012,
      }
    ];

    const [nodes, setNodes] = useState([{
      id: 'node1',
      x: 100,
      y: 100, 
    }, 
    {
      id: 'node2',
      x: 200,
      y: 200
    },{
      id: 'node3',
      x: 300,
      y: 300
    }
  ]);
  
const [edges, setEdges] = useState([{
  startId: nodes[0].id,
  startX:  nodes[0].x,
  startY: nodes[0].y,
  endId: nodes[1].id,
  endX: nodes[1].x,
  endY: nodes[1].y
},
{
  startId: nodes[1].id,
  startX:  nodes[1].x,
  startY: nodes[1].y,
  endId: nodes[2].id,
  endX: nodes[2].x,
  endY: nodes[2].y
}
]);

  // componentDidMount() {
  //   fetch("/libraries/current/entries")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({ references: data });
  //     })
  //     .catch(console.log);
  // }

  const [linking, setLinking] = useState(false);
  const [selected, setSelected] = useState("none");
  const [linkNodes, setLinkNodes] = useState([]);  

  const addNode = () => {
    let newNodes = nodes;
    newNodes.push({
      id: `node${nodes.length + 1}`,
      x: 100,
      y: 100
    });
    setNodes(newNodes)
  }

  const deleteNode = () => {
    console.log(selected)
    let newNodes = nodes.filter((node) => {return node.id !== selected} );
    setNodes(newNodes);
    setSelected("none");
  }

  const setSelectedNode = (newSelection) => {
    if(linking){
        if (linkNodes.length < 1){
          linkNodes.push(newSelection);
        } else if (linkNodes.length >= 1){
          linkNodes.push(newSelection);
          setLinking(false)
          console.log(linkNodes);

          makeEdge(linkNodes);

        }
        console.log(linkNodes);


    } else {
        setSelected(newSelection);
    }
  }

  const updateEdges = (id, x, y) => {

    let newEdges = [];

    if(edges !== undefined){
      edges.forEach((edge) => {
        if(edge.startId == id ){
          newEdges = edges.filter((edge) => {return edge.startId !== id})
          newEdges.push({
            startId: id,
            startX: x,
            startY: y,
            endId: edge.endId,
            endX: edge.endX,
            endY: edge.endY
          })
        } else if (edge.endId == id){
          newEdges = edges.filter((edge) => {return edge.endId !== id})
          newEdges.push({
            startId: edge.startId,
            startX: edge.startX,
            startY: edge.startY,
            endId: id,
            endX: x,
            endY: y 
          })
        }
      })
    }

    if(newEdges.length > 0) {
      setEdges(newEdges);
    }
  }

  const makeEdge = (nodesToLink) => {

    let node1 = nodes.filter((node) => {return node.id === nodesToLink[0]});
    let node2 = nodes.filter((node) => { return node.id === nodesToLink[1]});
    console.log("making edge")
    let newEdge = {
        startId: node1[0].id,
        startX:  node1[0].x,
        startY: node1[0].y,
        endId: node2[0].id,
        endX: node2[0].x,
        endY: node2[0].y
    };
    console.log(newEdge);
    edges.push(newEdge);

    setLinkNodes([]);
    setSelected("none");

    console.log("edges")
    console.log(edges);
    console.log(linking);
    console.log(selected)

  }

  const startLinking = () => {
        
    
    setLinking(!linking);
    setSelected("none");
  }
  
  return (
    <SelectedContextProvider>
      <div className="App">
        <Stage width="900" height="600" style={styles.map}>
            <Layer>
                {edges.map((edge) => 
                    <Edge x1={edge.startX} y1={edge.startY} x2={edge.endX} y2={edge.endY}/>
                )}
                {nodes.map((node) => 
                    <Node updateEdges={updateEdges} setSelectedNode={setSelectedNode} id={node.id} x={node.x} y={node.y} selected={selected}/>
                )}
            </Layer>
        </Stage>

        <div className="App-header">
          <div className="Reference-proportions">
            {references && <ReferenceList references={references} />}
          </div>
          <Editor />
          <div id="map" style={styles.map}></div>
          <Button onClick={addNode}>
            Add
          </Button>
          <Button onClick={deleteNode}>
            Delete
          </Button>
          <Button onClick={startLinking}>
            Link
          </Button>

        </div>
      </div>
    </SelectedContextProvider>

  )
}
const styles = {
  map: {
    border: '5px solid pink',
  },
  mapContainer: {
    
  }
}

export default MindMap;
