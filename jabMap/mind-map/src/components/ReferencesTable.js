import React from "react";
import "../styling/ReferencesTable.css";
import useWindowDimensions from "../WindowDimensions";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const ReferencesTable = ({references, setReferences, draggedRow, addNode}) => {

    const {windowHeight, windowWidth} = useWindowDimensions();
    const MAX_LENGTH = 20;

    const renderText = (text) => {
        console.log(text)
        if(text){
            if(text.length > MAX_LENGTH) {
                return `${text.substring(0, MAX_LENGTH - 3)}...` 
            } else {
                return text;
            }
        }

    }

    return (
        <div className="table-proportions" style={{maxHeight: windowHeight - 70}}>
            <Card style={{width: "99.5%"}}>
                <Typography gutterBottom variant="h4" component="h4" style={{textAlign:"center"}}>
                    References
                </Typography>
                <div>
                    <table key="reference-table" hover="true" size="small" className="table-striped">
                        <thead key="table-header">
                        <tr key="table-header-row">
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                        </tr>
                        </thead>
                        <tbody key="table-body">
                        {references &&
                        references.map((ref) => (
                            <tr key={ref.title}
                            draggable={true}
                            onDragStart={e => {
                                draggedRow.current = ref
                            }}>
                                <td key={ref.title + "-title"} className="displayedText">{renderText(ref.title)}<p className="fullText">{ref.title}</p></td>
                                <td key={ref.title + "-author"} className="displayedText">{renderText(ref.author)}<p className="fullText">{ref.author}</p></td>
                                <td key={ref.title + "-year"}>{renderText(ref.year)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export default React.memo(ReferencesTable)
