import React from "react";
import {Paper, TableContainer, Table, TableCell, TableBody, TableRow, TableHead} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import {
    Rect,
    Group,
    Text
} from 'react-konva';




const KonvaReferencesTable = ({references, setReferences, addNode}) => {

    console.log("render")
    //Styles
    const useStyles = makeStyles({
        table: {
            position: "absolute",
            left: 0,
            top: 0,
            maxWidth: "25%",
            // minWidth: "200px",
            overflow: "hidden",
            tableLayout: "fixed",
            height: "100vh",
            backgroundColor: "#e1e1e1"
        }
    });
    const classes = useStyles();
    const width = 300;
    const height = 100;
    const margin = 10;


    console.log(references)
    //Rendered table using Material UI library
    return(
        <Group>
            {references.map((references, index) => (
                <Group>
                    <Group y ={index * (height + margin)}>
                        <Rect width={width}
                        height={height}
                        fill={"#eaeaea"}
                              // opacity={0.5}
                        />

                        <Text text={references.title}
                              x={width / 2}
                              y={height / 2}
                              // align="center"
                              // verticalAlign="middle"
                              width={100}
                              height={60}
                        />
                    </Group>

                    {/*DRAGGABLE VERSION*/}
                    <Group y ={index * (height + margin)}
                    opacity={0.5}
                    draggable
                    onDragEnd={() => {

                        addNode(references)}}>
                    <Rect width={width}
                    height={height}
                    fill={"#eaeaea"}
                    />

                    <Text text={references.title}
                    x={width / 2}
                    y={height / 2}
                    // align="center"
                    // verticalAlign="middle"
                    width={100}
                    height={60}
                    />
                    </Group>
                </ Group>
                    ))}

        </Group>
    )

}

export default React.memo(KonvaReferencesTable)
