import React from "react";
//import logo from './logo.svg';
import "./App.css";
import Node from "./Node";
import Edge from "./Edge";
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer, Group } from 'react-konva';


const MindMap = ({nodes, edges, updateEdges, setSelectedNode, selectedNodeId, updateNode}) => {
    const width = window.innerWidth * 0.75;
    const height = window.innerHeight;
    const useStyles = makeStyles({
        canvas: {
            left: "25%",
            position: "absolute"
        },
    });
    const classes = useStyles();

    return (
        <Group x={310}>
            {edges.map((edge) =>
                <Edge x1={edge.startX} y1={edge.startY} x2={edge.endX} y2={edge.endY}/>
            )}
            {nodes.map((node) =>
                <Node node={node} updateEdges={updateEdges} selectedNodeId={selectedNodeId} setSelectedNode={setSelectedNode} updateNode={updateNode}/>
            )}
        </ Group>
    )
}

export default MindMap;
