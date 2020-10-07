import React, {useEffect}
    from "react";
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

    //TODO: Call API and store references in references
    // Call API on refresh
    // useEffect(() => {
    //     fetch("/libraries/current/entries")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             setReferences(data);
    //         })
    //         .catch(console.log);
    // });



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
                    <TableRow key={references.title} className={classes.row}>
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
