import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { ReferenceList } from './components/sidebar.jsx'; 
import Toolbar from '@material-ui/core/Toolbar';

function App() {
  return (
    <div className="App">
		<div className="Reference-proportions">
			<ReferenceList /> 
		</div>
    </div>
	
  );
}

export default App;
