import React, { Component, useContext, useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Node from "./components/Node";
import Edge from "./components/Edge";
import MindMap from "./MindMap";
import ReferenceList from "./components/sidebar";
import { Editor } from "./components/toolbar.jsx";
import * as mmp from 'mmp';
import { Button } from "@material-ui/core";
import { SelectedContextProvider } from './context/SelectedContext';
import { SelectedContext } from './context/SelectedContext';



const App = () => {



  return (
    <SelectedContextProvider>
      <MindMap />
    </SelectedContextProvider>

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
