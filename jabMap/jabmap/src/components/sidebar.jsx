import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'react-bootstrap/Table'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import './sidebar.css';

//class='overflow-hidden'

export const ReferenceList = (props) => {
  return (
    <TableContainer component={Paper} className="Table-proportions" >
      <Table className = "table table-bordered table-striped table-hover" aria-label="simple table" >
        <thead>
          <tr>
           References
          </tr>
		  <tr>
            <td className = "Table-proportions" >Author</td>
			<td  >Title</td>
			<td >Year</td>
			<td >Journal</td>
          </tr>
        </thead>
        <tbody>
			<tr>
            <td  >Name</td>
			<td >A paper with title</td>
			<td >2010</td>
			<td >Science things</td>
          </tr>
          <tr>
            <td  >Name</td>
			<td >A paper </td>
			<td >2010</td>
			<td >Science</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
}

