import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './editor.css';

export const Editor = (props) =>{
	return (
		<Toolbar className = 'Toolbar-proportions' component = { Paper }>
			<div style={{  borderRight: '0.1em solid grey', borderRight: '0.1em solid grey', padding: '0.5em' }}>
				<IconButton size="small" aria-label = "add" > 
					<AddIcon/>
				</IconButton>
			</div>
			<div style={{ borderRight: '0.1em solid grey', padding: '0.5em' }}>
				<IconButton size="small"  aria-label = "colour" style={{marginRight: 10}}> 
					<FormatColorFillIcon/>
				</IconButton>
				<IconButton size="small" aria-label = "arrow" > 
					<ArrowForwardIcon/>
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
				<div style={{ borderRight: '0.1em solid grey', padding: '0.5em' }}>
				<IconButton size="small" >
					<DeleteOutlineIcon/>
				</IconButton>
			</div>
			<div style={{ align: "right",  padding: '0.5em' }}>
				<select style={{ border: 'none', textAlign: 'centre', fontSize: 12, marginRight: 50, marginLeft:30 }} >
				<option value = "noFilter"> No Filter </option>
					<option value = "highPriority"> High Priority </option>
					<option value = "favourites"> Low Priority </option>
					<option value = "favourites"> Favourites </option>
				</select> 
				<input type="text" name="search" defaultValue="Search" style={{ textAlign: 'centre', fontSize: 12}}/>
			</div>
		</Toolbar> 
	); 
}
