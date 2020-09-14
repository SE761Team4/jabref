import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { ReferenceList } from './components/sidebar.jsx'; 
import { Editor } from './components/toolbar.jsx';

function App() {
  return (
    <div className="App">
		<div className = "App-header">
			<div className="Reference-proportions">
				<ReferenceList /> 			
			</div>
			<Editor/>
		</div>
		
    </div>
	
  );
}

export default App;
