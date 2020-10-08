import { Button } from "@material-ui/core";
import React, {useRef } from "react";
import {makeStyles} from "@material-ui/core/styles";
import './App.css'

const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter,updateNodeColor,updateSearchIndex}) => {
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();

    const inputRef = useRef(null);

    const addNode = () => {
        if (selectedNodeId != "") {
            const newNode = {
                id: `node${globalNodeIdCounter}`,
                x: 400,
                y: 400
            }
            setGlobalNodeIdCounter(globalNodeIdCounter + 1);

            setNodes([...nodes, newNode]);
            const selectedNode = getNodeById(selectedNodeId);
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

    const deleteNode = () => {
        if (selectedNodeId !== "") {
            setNodes(nodes.filter((node) => {return node.id !== selectedNodeId}));
            setEdges(edges.filter((edge) => { return edge.startId !== selectedNodeId && edge.endId !== selectedNodeId }));
        }
    }

    const searchNodes = (event) =>{ 

        // TODO: currently search node from id, should add label search, icon search

        var searchterm = event.target.value;
        var indx = [];
        
        if(searchterm == ''){
            updateSearchIndex(indx)
            return;
        }
        
        nodes.forEach((node) => {
            if(node.id.indexOf(searchterm)>-1) {
                indx.push(node.id);
            }
        });

        updateSearchIndex(indx)
     }
 
     const changeNodeColor = (event) =>{ 
         var newColor = event.target.value;

         updateNodeColor(selectedNodeId,newColor);
     }


     window.onkeydown = function(e)  {
        e.preventDefault();
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)){
            // listen to ctrl + F
            inputRef.current.focus();
        }
    }

    return(
        <div className={classes.toolbar}>
            <Button onClick={addNode}>Add Node</Button>
            <Button onClick={deleteNode}>Delete Node</Button>
            <input id='nodeColor' type="color" onChange = {changeNodeColor}></input>
            <input type='text'  id='searchnode' onChange={searchNodes}  ref={inputRef } placeholder="🔎Node Search" size='30'  />
        </div>
    )
}

export default Toolbar;
