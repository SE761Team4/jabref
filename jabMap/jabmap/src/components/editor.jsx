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
		<Toolbar className = 'toolbar-proportions' component = { Paper }>
			<div className="divider">
				<IconButton size="small" aria-label = "add" className='icon-button'> 
					<AddIcon/>
				</IconButton>
			</div>
			<div className="divider">
				<IconButton size="small"  aria-label = "colour" className='icon-button'> 
					<FormatColorFillIcon/>
				</IconButton>
				<IconButton size="small" aria-label = "arrow" className='icon-button--second'> 
					<ArrowForwardIcon/>
				</IconButton>
			</div>
			<div className="divider">
				<IconButton size="small" className='icon-button'>
					<ErrorOutlineIcon/>
				</IconButton>
				<IconButton size="small" className='icon-button--second'>
					<StarBorderIcon/>
				</IconButton>	
			</div>
				<div className="divider">
				<IconButton size="small" className='icon-button'>
					<DeleteOutlineIcon/>
				</IconButton>
			</div>
			<div className='search-filter-container'>
				<select className='filter' >
				<option value = "noFilter"> No Filter </option>
					<option value = "highPriority"> High Priority </option>
					<option value = "favourites"> Low Priority </option>
					<option value = "favourites"> Favourites </option>
				</select> 
				<input className='searchbar' type="text" name="search" defaultValue="Search" />
			</div>
		</Toolbar> 
	); 
}
