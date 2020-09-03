import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




export const ReferenceList = (props) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">References</TableCell>
          </TableRow>
		  <TableRow>
            <TableCell align="left" >Author</TableCell>
			<TableCell align="left" >Title</TableCell>
			<TableCell align="left">Year</TableCell>
			<TableCell align="left">Journal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

