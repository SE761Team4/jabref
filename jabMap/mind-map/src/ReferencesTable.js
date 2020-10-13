import React, {useRef} from "react";
import {Paper, TableContainer, Table, TableCell, TableBody, TableRow, TableHead} from "@material-ui/core";
import "./ReferencesTable.css";
import { makeStyles } from '@material-ui/core/styles';
import useWindowDimensions
    from "./WindowDimensions";
import Typography
    from "@material-ui/core/Typography";
import Card
    from "@material-ui/core/Card";




const ReferencesTable = ({references, setReferences, draggedRow, addNode}) => {


    const {windowHeight, windowWidth} = useWindowDimensions();


    return (
        <div className="Table-proportions"style={{maxHeight:windowHeight - 70}}>
            <Card style={{width: "99.5%"}}>
                <Typography gutterBottom variant="h4" component="h4" style={{textAlign:"center"}}>
                    References
                </Typography>
                <div>
                    <Table hover size="sm" className="table-striped">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                        </tr>
                        </thead>
                        <tbody>
                        {references &&
                        references.map((ref) => (
                            <TableRow key={ref}
                            draggable={true}
                            onDragStart={e => {
                                draggedRow.current = ref
                            }}>
                                <td>{ref.title}</td>
                                <td>{ref.author}</td>
                                <td>{ref.year}</td>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}

export default React.memo(ReferencesTable)
