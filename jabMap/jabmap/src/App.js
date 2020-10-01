import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { Editor } from "./components/editor.jsx";
import Paper from '@material-ui/core/Paper';
import * as mmp from 'mmp';
import "./App.css";
import { MindMap } from "./components/mindMap";

const App = () => {

  const [mindmap, setMindmap] = useState([]);
  const [references, setReferences] = useState([]);


  // const references = [
  //     {
  //       author: "An author",
  //       title: "A paper",
  //       year: 2010,
  //     },
  //     {
  //       author: "The author",
  //       title: "The paper",
  //       year: 2011,
  //     },
  //     {
  //       author: "Author 1",
  //       title: "A book",
  //       year: 2010,
  //     },
  //     {
  //       author: "Famous author",
  //       title: "An article",
  //       year: 2012,
  //     }
  //   ];

  useEffect(() => {
    const d3Script = document.createElement('script');
    const mmpScript = document.createElement('script');

    d3Script.src = "../node_modules/d3/dist/d3.js";
    d3Script.async = true;
    mmpScript.src = "../node_modules/mmp/build/mmp.js";
    mmpScript.async = true;

    document.body.appendChild(d3Script);
    document.body.appendChild(mmpScript)

    fetch("/libraries/current/entries")
    .then((res) => res.json())
    .then((data) => {
      setReferences(data);
    })
    .catch(console.log);

    createMap();
  }, []);

  const createMap = () => {
    let map = mmp.create("map", { rootNode: { name: "Map" } });
    setMindmap(map);
  }

  const addNode = () => {
    mindmap.addNode();
  }

  const removeNode = () => {
    mindmap.removeNode();
  }

  const center = () => {
    mindmap.center();
  }

  const redo = () => {
    mindmap.redo();
  }

  const undo = () => {
    mindmap.undo();
  }




  return (
    <div className="app">
      <div className="left-container">
        <div className="sidebar">
          {references && <Sidebar references={references} />}
        </div>
      </div>
      <div className="right-container">
        <Editor addNode={addNode} removeNode={removeNode} center={center} undo={undo} redo={redo} />
        <Paper elevation={3} className="mindmap-container" >
          <div id="map" className='map'></div>
        </Paper>
        <MindMap addNode={addNode}></MindMap>
      </div>
    </div>
  )
}


export default App;
