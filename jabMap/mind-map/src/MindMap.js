import React, { Component, useContext, useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Node from "./Node";
import Edge from "./Edge";
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Layer } from 'react-konva';


const MindMap = ({nodes, edges, updateEdges, setSelectedNodeId, selectedNodeId, updateNode}) => {
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
        <Stage width={width} height={height} className={classes.canvas}>
            <Layer>
                {edges.map((edge) =>
                    <Edge x1={edge.startX} y1={edge.startY} x2={edge.endX} y2={edge.endY}/>
                )}
                {nodes.map((node) =>
                    <Node id={node.id} x={node.x} y={node.y} updateEdges={updateEdges} selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId} updateNode={updateNode}/>
                )}
            </Layer>
        </Stage>
    )
}

export default MindMap;
