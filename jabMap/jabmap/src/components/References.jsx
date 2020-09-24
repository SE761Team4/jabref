import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./sidebar.css";

class References extends Component {

  render() {
    return (
      <div>
        <div className="tableContainer">
          <Table hover size="sm" className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {this.props.references &&
                this.props.references.map((ref) => (
                  <tr key={ref.title}>
                    <td>{ref.title}</td>
                    <td>{ref.author}</td>
                    <td>{ref.year}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default References;
