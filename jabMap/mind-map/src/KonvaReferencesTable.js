import React, {
    createRef,
    useRef
} from "react";
import {Paper, TableContainer, Table, TableCell, TableBody, TableRow, TableHead} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import {
    Rect,
    Group,
    Text
} from 'react-konva';




const KonvaReferencesTable = ({references, setReferences, addNode, layerRef, stageRef}) => {

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

    const arrLength = references.length;
    const elRefs = React.useRef([]);

    if (elRefs.current.length !== arrLength) {
        // add or remove refs
        elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || createRef());
    }

    //console.log(references)
    //Rendered table using Material UI library
    return(
        <Group>
            {references.map((reference, index) => {
                return (
                <Group>
                    <Group
                        y={index * (height + margin)}>
                        <Rect
                            width={width}
                            height={height}
                            fill={"#dddddd"}
                            // opacity={0.5}
                        />

                        <Text
                            text={reference.title}
                            x={width / 2}
                            y={height / 2}
                            // align="center"
                            // verticalAlign="middle"
                            width={100}
                            height={60}
                        />
                    </Group>

                    {/*DRAGGABLE VERSION*/}
                    <Group
                        // y={index * (height + margin)}
                        opacity={0.5}
                        draggable
                        ref={elRefs.current[index]}
                        position={{x:0, y: index * (height + margin)}}
                        onDragEnd={() => {
                            //console.log(elRefs.current[index])
                            elRefs.current[index].current.position({x : 0, y : index * (height + margin)})
                            //console.log(layerRef)
                            layerRef.current.draw()
                            const {x, y} = stageRef.current.getPointerPosition()
                            addNode(reference, x - 300, y, reference.citekey)
                        }}>
                        <Rect
                            width={width}
                            height={height}
                            fill={"#dddddd"}
                        />

                        <Text
                            text={reference.title}
                            x={width / 2}
                            y={height / 2}
                            // align="center"
                            // verticalAlign="middle"
                            width={100}
                            height={60}
                        />
                    </Group>
                </ Group>
                )
            })}

        </Group>
    )

}

export default React.memo(KonvaReferencesTable)
