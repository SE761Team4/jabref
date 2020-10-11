import { Button } from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

// const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter}) => {


const Toolbar = ({addNode, saveMap, deleteNode}) => {
    console.log("toolbar render")
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();



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

    return(
        <div className={classes.toolbar}>
            <Button onClick={() => addNode()}>Add Node</Button>
            <Button onClick={() => saveMap()}>Save Map</Button>
             <Button onClick={deleteNode}>Delete Node</Button>
        </div>
    )
}

export default React.memo(Toolbar);
