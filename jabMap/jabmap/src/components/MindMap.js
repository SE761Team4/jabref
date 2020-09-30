import React from 'react';
import * as mmp from 'mmp';


const MindMap = () => {

    const options = {
        fontFamily: "Arial, Helvetica, sans-serif",
        centerOnResize: true,
        drag: false,
        zoom: false,
        defaultNode: {
            name: "Default node name",
            image: {
                src: "",
                size: 60
            },
            colors: {
                name: "#787878",
                background: "#f9f9f9",
                branch: "#577a96"
            },
            font: {
                size: 16,
                style: "normal",
                weight: "normal"
            },
            locked: true
        },
        rootNode: {
            name: "Default root node name",
            image: {
                src: "",
                size: 70
            },
            colors: {
                name: "#787878",
                background: "#f0f6f5",
                branch: ""
            },
            font: {
                size: 20,
                style: "normal",
                weight: "normal"
            }
        }
    }

    const create = () => {
        let myMap = mmp.create("map", options)
    }

    return (
        <div>
            <div id="map"></div>
            <script src="node_modules/d3/build/d3.min.js"></script>
            <script src="node_modules/mmp/build/mmp.min.js"></script>
            <script>
                {mmp.new()}
            </script>
        </div>
    )
}

export default MindMap;