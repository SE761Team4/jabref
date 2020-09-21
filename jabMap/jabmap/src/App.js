import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import { ReferenceList } from './components/sidebar.jsx'; 
import { Editor } from './components/toolbar.jsx';

class App extends Component {
	
	state = {
		references: []
	}
	
	 componentDidMount() {
        fetch('http://localhost:9898/libraries/current/entries')
        .then(res => res.json())
        .then((data) => {
          this.setState({ references: data })
        })
        .catch(console.log)
      }
	  
	render() {
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
}

export default App;
