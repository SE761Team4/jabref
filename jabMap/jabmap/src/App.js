import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import References from "./components/References";
import { Editor } from "./components/toolbar.jsx";

class App extends Component {
  state = {
    references: [],
  };

  componentDidMount() {
    fetch("/libraries/current/entries")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ references: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Reference-proportions">
            {this.state.references && <References references={this.state.references} />}
          </div>
          <Editor />
        </div>
      </div>
    );
  }
}

export default App;
