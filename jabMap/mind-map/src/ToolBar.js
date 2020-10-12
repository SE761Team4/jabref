import { Button } from "@material-ui/core";
import React, {useRef } from "react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import './toolbar.css';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HeightIcon from '@material-ui/icons/Height';

// const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter}) => {


const MindMapToolbar = ({addNode, saveMap, deleteNode, searchNodes, linking, setLinking}) => {
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();

    const inputRef = useRef(null);


     window.onkeydown = function(e)  {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)){
            // listen to ctrl + F
            e.preventDefault();
            inputRef.current.focus();
        }
    }

    return(
        <Toolbar className = 'Toolbar-proportions' component = { Paper }>
        <div style={{  borderRight: '0.1em solid grey', padding: '0.5em' }}>
            <IconButton size="small" aria-label = "add" onClick={() => addNode()} >
                <AddIcon/>
            </IconButton>
            <IconButton size="small" onClick={() => setLinking(!linking)} color={linking ? 'primary' : 'default'} >
                <HeightIcon />
            </IconButton>
            <IconButton size="small" onClick={deleteNode}>
                    <DeleteOutlineIcon/>
            </IconButton>
        </div>
        <div style={{ borderRight: '0.1em solid grey', padding: '0.5em' }}>
            <IconButton size="small" style={{marginRight: 10}}>
                <ErrorOutlineIcon/>
            </IconButton>
            <IconButton size="small" >
                <StarBorderIcon/>
            </IconButton>
        </div>
            <IconButton size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <SaveIcon />
            </IconButton>
        <div style={{ align: "right",  padding: '0.5em' }}>
            <select style={{ border: 'none', textAlign: 'centre', fontSize: 12, marginRight: 50, marginLeft:30 }} >
            <option value = "noFilter"> No Filter </option>
                <option value = "highPriority"> High Priority </option>
                <option value = "favourites"> Low Priority </option>
                <option value = "favourites"> Favourites </option>
            </select>
            <input type='text'  id='searchnode' onChange={searchNodes}  ref={inputRef } placeholder="🔎Node Search" size='30'  />
        </div>
    </Toolbar>
    )
}

export default React.memo(MindMapToolbar);
