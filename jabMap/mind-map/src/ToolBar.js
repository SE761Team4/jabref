import { Button } from "@material-ui/core";
import React, {useRef } from "react";
import {makeStyles} from "@material-ui/core/styles";
import './App.css'

// const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter}) => {


const Toolbar = ({addNode, saveMap, deleteNode, searchNodes, changeNodeColor}) => {
    console.log("toolbar render")
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();

    const inputRef = useRef(null);

    // const addNode = () => {
    //     if (selectedNodeId !== "") {
    //         const newNode = {
    //             id: `node${globalNodeIdCounter}`,
    //             x: 400,
    //             y: 400
    //         }
    //         setGlobalNodeIdCounter(globalNodeIdCounter + 1);

    //         setNodes([...nodes, newNode]);
    //         const selectedNode = getNodeById(selectedNodeId);
    //         const newEdge = {
    //             startId: selectedNode.id,
    //             startX:  selectedNode.x,
    //             startY: selectedNode.y,
    //             endId: newNode.id,
    //             endX: newNode.x,
    //             endY: newNode.y
    //         }

    //         setEdges([...edges, newEdge])
    //     }
    // }

    // const deleteNode = () => {
    //     if (selectedNodeId !== "") {
    //         setNodes(nodes.filter((node) => {return node.id !== selectedNodeId}));
    //         setEdges(edges.filter((edge) => { return edge.startId !== selectedNodeId && edge.endId !== selectedNodeId }));
    //     }
    // }


     window.onkeydown = function(e)  {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)){
            // listen to ctrl + F
            e.preventDefault();
            inputRef.current.focus();
        }
    }

    return(
        <div className={classes.toolbar}>
            <Button onClick={() => addNode()}>Add Node</Button>
            <Button onClick={() => saveMap()}>Save Map</Button>
             <Button onClick={deleteNode}>Delete Node</Button>
            <input id='nodeColor' type="color" onChange = {changeNodeColor}></input>
            <input type='text'  id='searchnode' onChange={searchNodes}  ref={inputRef } placeholder="🔎Node Search" size='30'  />
        </div>
    )
}

export default React.memo(Toolbar);
