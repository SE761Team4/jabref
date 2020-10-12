import {makeStyles} from "@material-ui/core/styles";
import React
    , {
    useEffect,
    useRef,
    useState
} from "react";
import InputLabel
    from "@material-ui/core/InputLabel";
import FormControl
    from "@material-ui/core/FormControl";
import Input
    from "@material-ui/core/Input";
import FormHelperText
    from "@material-ui/core/FormHelperText";
import Card
    from "@material-ui/core/Card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CardHeader
} from "@material-ui/core";
import Typography
    from "@material-ui/core/Typography";
import TextField
    from "@material-ui/core/TextField";

const NodeInfoPanel = ({node, reference, updateNode, changeNodeColor}) => {

    //Styles
    const useStyles = makeStyles({
       panel: {
            position: "absolute",
           top: 10,
           right: 10,
           width: "300px",
           height: "400px",
           backgroundColor: "#dddddd"
        }
    });
    const classes = useStyles();
    const labelInputRef = useRef();

    const [inputValue, setInputValue] = useState();
    useEffect(() => {
        setInputValue(node.label)
        labelInputRef.current.focus();
    }, [node]);

    const updateValue = (e) => {
        setInputValue(e.target.value);
        node.label = e.target.value;
        updateNode(node);
    }

    return(
        <Card className={classes.panel}>
            <Typography gutterBottom variant="h4" component="h4" style={{textAlign:"center"}}>
                Node Info
            </Typography>
            <TextField style={{width:"90%", marginBottom:"20px", marginLeft:"5%"}} id="standard-basic" label="Label" value={inputValue} type="text" inputRef={labelInputRef} onChange={updateValue}/>
            <TableRow key="colorEditor">
                    <TableCell component="td" scope="row">
                        Color:
                    </TableCell>
                    <TableCell component="td" scope="row">
                    <input id='nodeColor' type="color" value={node.colour==undefined?'black':node.colour} onChange = {changeNodeColor}></input>
                    </TableCell>
                </TableRow>

            {reference &&
            <Table className={classes.table} aria-label="simple table">
                <Typography gutterBottom style={{marginLeft:"5%"}} variant="h5" component="h5" >
                    BibEntry
                </Typography>
                <TableBody>
                     <TableRow key={reference.title}>
                        <TableCell component="td" scope="row">
                            Title:
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {reference.title}
                        </TableCell>
                    </TableRow>
                    <TableRow key={reference.author}>
                        <TableCell component="td" scope="row">
                            Author:
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {reference.author}
                        </TableCell>
                    </TableRow>
                    <TableRow key={reference.year}>
                        <TableCell component="td" scope="row">
                            Year:
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {reference.year}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>}
        </Card>
    )
}

export default NodeInfoPanel;
