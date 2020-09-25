import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './sidebar.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    fontFamily: 'Arial',
    border: 'none',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 25,
    '&:nth-of-type(even)': {
      backgroundColor: '#efefef',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

const ReferenceList = ({references}) => {
  const classes = useStyles();
  const [numRows, setNumRows] = useState(10);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="refs table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Author</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {references &&
          references.map((ref) => (
            <StyledTableRow key={ref.title}>
              <StyledTableCell component="th" scope="row">{ref.title}</StyledTableCell>
              <StyledTableCell>{ref.author}</StyledTableCell>
              <StyledTableCell>{ref.year}</StyledTableCell>
            </StyledTableRow>
        ))}
        {Array(numRows - references.length).fill(
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReferenceList;

