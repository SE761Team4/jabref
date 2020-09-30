import React, { useEffect } from 'react';
import * as mmp from 'mmp';


const MindMap = () => {


    useEffect(() => {
        const d3Script = document.createElement('script');
        const mmpScript = document.createElement('script');

        d3Script.src = "node_modules/d3/build/d3.min.js";
        d3Script.async = true;
        mmpScript.src = "node_modules/mmp/build/mmp.min.js";
        mmpScript.async = true;

        document.body.appendChild(d3Script);
        document.body.appendChild(mmpScript);

    }, []);
    

    const create = () => {
        mmp.create("map", {rootNode: { name: "Map"}})
    }

    // let myMap = mmp.create("map", {rootNode: { name: "Map"}})

    return (
        <div>
            <div id="map"></div>

            {mmp.create("mmp1", { rootNode: { name: "Map" } })}
        </div>
    )
}

export default MindMap;