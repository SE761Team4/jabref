import React, { Component, useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Circle from "./components/Circle";
import MindMap from "./components/MindMap";
import ReferenceList from "./components/sidebar";
import { Editor } from "./components/toolbar.jsx";
import * as mmp from 'mmp';
import { Button } from "@material-ui/core";


const App = () => {
  const references = [
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
    ];

  // componentDidMount() {
  //   fetch("/libraries/current/entries")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({ references: data });
  //     })
  //     .catch(console.log);
  // }

  useEffect(() => {
    const d3Script = document.createElement('script');
    const mmpScript = document.createElement('script');

    d3Script.src = "../node_modules/d3/dist/d3.js";
    d3Script.async = true;
    mmpScript.src = "../node_modules/mmp/build/mmp.js";
    mmpScript.async = true;

    document.body.appendChild(d3Script);
    document.body.appendChild(mmpScript)

    createMap();
  }, []);

  const createMap = () => {
    mmp.create("map", { rootNode: { name: "Map" } });
  }


  const [xStart, setXStart] = useState();
  const [xEnd, setXEnd] = useState();
  const [yStart, setYStart] = useState();
  const [yEnd, setYEnd] = useState();



  return (
    <div className="App">
      <svg width="500" height="500">
          <Circle xStart={setXStart} yStart={setYStart}/>
          <Circle xStart={setXEnd} yStart={setYEnd}/>
          <line x1={xStart} y1={yStart} x2={xEnd} y2={yEnd} style={{stroke:'rgb(255,0,0)', strokeWidth: 2 }} />

      </svg>
      <div className="App-header">
        <div className="Reference-proportions">
          {references && <ReferenceList references={references} />}
        </div>
        <Editor />
        <div id="map" style={styles.map}></div>
        <Button onClick={createMap}>
          Click
        </Button>

      </div>

    </div>
  )
}
const styles = {
  map: {
    border: '5px solid pink',
    width: 100,
    height: 100
  },
  mapContainer: {
    
  }
}

export default App;
