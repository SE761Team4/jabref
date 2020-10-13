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
import { CirclePicker } from 'react-color';
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
           top: 74,
           right: 10,
           width: "300px",
           backgroundColor: "white",

           '& td': {
               border: "none",
               padding: "10px"
           },
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
            <TextField style={{ width:"calc(100% - 20px)", marginBottom:"10px", marginLeft:"10px"}}  InputLabelProps={{shrink: true,}} id="standard-basic" label="Label" value={inputValue} type="text" inputRef={labelInputRef} onChange={updateValue}/>
            <TableRow key="colorEditor">
                    <TableCell component="td" scope="row" style ={{border: "none", color: "#3f51b5"}}>
                        Color:
                    </TableCell>
                    <TableCell component="td" scope="row" style ={{border: "none"}}>
                    {/*<input id='nodeColor' type="color" value={ node.colour === undefined? 'black': node.colour} onChange = {changeNodeColor}></input>*/}
                    <CirclePicker colors={['#BA1D2A', '#FC6A38', '#55773B', '#279DA3', '#0E5756']} onChange={changeNodeColor}/>
                    </TableCell>
                </TableRow>

            {reference &&
            <Table className={classes.table} aria-label="simple table">
                <Typography gutterBottom style={{paddingLeft: "10px", margin: 0}} variant="h5" component="h5" >
                    BibEntry
                </Typography>
                <TableBody>
                     <TableRow key={reference.title}>
                        <TableCell component="td" scope="row" style={{color: "#3f51b5"}}>
                            Title:
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {reference.title}
                        </TableCell>
                    </TableRow>
                    <TableRow key={reference.author}>
                        <TableCell component="td" scope="row" style={{color: "#3f51b5"}}>
                            Author:
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {reference.author}
                        </TableCell>
                    </TableRow>
                    <TableRow key={reference.year}>
                        <TableCell component="td" scope="row" style={{color: "#3f51b5"}}>
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
