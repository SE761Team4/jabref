import React
    from "react";
import {
    Table,
    TableRow
} from "@material-ui/core";
import "../styling/ReferencesTable.css";
import useWindowDimensions
    from "../WindowDimensions";
import Typography
    from "@material-ui/core/Typography";
import Card
    from "@material-ui/core/Card";

const ReferencesTable = ({references, draggedRow}) => {

    const {windowHeight, } = useWindowDimensions();
    return (
        <div className="table-proportions"style={{height:windowHeight, backgroundColor: "#f9f9f9"}}>
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
                                <td className="displayedText">{ref.title}</td>
                                <td className="displayedText">{ref.author}</td>
                                <td className="displayedText">{ref.year}</td>
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
