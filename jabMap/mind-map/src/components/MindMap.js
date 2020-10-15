import React
    from "react";
import "../App.css";
import Node
    from "./Node";
import Edge
    from "./Edge";
import {Group} from 'react-konva';


const MindMap = ({nodes, edges, updateEdges, setSelectedNode, selectedNodeId, updateNode}) => {
    return (
        <Group x={310}>
            {edges.map((edge) =>
                <Edge key={edge.startID} x1={edge.startX} y1={edge.startY} x2={edge.endX} y2={edge.endY}/>
            )}
            {nodes.map((node) =>
                <Node node={node} key={node.id} label={node.label} colors={node.colors} id={node.id} x={node.x_pos} y={node.y_pos} colour={node.colour} updateEdges={updateEdges} selectedNodeId={selectedNodeId} setSelectedNode={setSelectedNode} updateNode={updateNode} isInSearch = {node.isInSearch}/>
            )}
        </ Group>
    )
}

export default MindMap;
