import { Button } from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import './App.css'

const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter,updateNodeColor}) => {
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();



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
        var searchterm = event.target.value;
        var indx = [];
        
        if(searchterm == ''){
            updateNodeColor(indx, 'blue')
            return;
        }
        
        nodes.forEach((node) => {
            if(node.id.indexOf(searchterm)>-1) {
                indx.push(node.id);
            }
        });
        updateNodeColor(indx, 'blue')
        //var searchedOnes = nodes.find(x => x.id.indexOf(searchterm)>-1 );
        //alert(searchedOnes[0])
        //for(var node in searchedOnes){
        //    updateNodeColor(searchterm, 'blue')

        //}

     }
 
     const changeNodeColor = (event) =>{ 
         var newColor = event.target.value;
         //var selectedNode = getNodeById(selectedNodeId);
         updateNodeColor(selectedNodeId,newColor);
         
     }

    return(
        <div className={classes.toolbar}>
            <Button onClick={addNode}>Add Node</Button>
            <Button onClick={deleteNode}>Delete Node</Button>
            
            <input id='nodeColor' type="color" onChange = {changeNodeColor}></input>
            <input type='text'  id='searchnode' onChange={searchNodes} placeholder="🔎Node Search" size='30'/>
        </div>
    )
}

export default Toolbar;
