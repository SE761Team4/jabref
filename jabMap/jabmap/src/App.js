import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import Circle from "./components/Circle";
import MindMap from "./components/MindMap";
import ReferenceList from "./components/sidebar";
import { Editor } from "./components/toolbar.jsx";

class App extends Component {
  state = {
    references: [
      {
        author: "An author",
        title: "A paper",
        year: 2010,
      },
      {
        author: "The author",
        title: "The paper",
        year: 2011,
      },
      {
        author: "Author 1",
        title: "A book",
        year: 2010,
      },
      {
        author: "Famous author",
        title: "An article",
        year: 2012,
      }
    ],
  };

  // componentDidMount() {
  //   fetch("/libraries/current/entries")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({ references: data });
  //     })
  //     .catch(console.log);
  // }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Reference-proportions">
            {this.state.references && <ReferenceList references={this.state.references} />}
          </div>
          <Editor />
          <svg
            viewBox="0 0 400 400" 
            width="400" 
            height="400"
          >
            <Circle />
            <Circle />
          
          </svg>
          <MindMap className={styles.map}/>
        </div>
      </div>
    );
  }
}

const styles = {
  map: {
    border: '5px solid pink'
  }
}

export default App;
