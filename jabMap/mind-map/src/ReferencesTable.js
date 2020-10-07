import React from "react";
import {Paper, TableContainer, Table, TableCell, TableBody, TableRow, TableHead} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';




const ReferencesTable = ({references, setReferences}) => {
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

    //Rendered table using Material UI library
    return(<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow className={classes.row}>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Year</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {references.map((references) => (
                    <TableRow key={references.title + references.author} className={classes.row}>
                        <TableCell component="th" scope="row">
                            {references.title}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {references.author}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {references.year}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}

export default ReferencesTable
