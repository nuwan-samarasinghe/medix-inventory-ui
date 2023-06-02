import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {AddCircleOutline} from "@material-ui/icons";
import {withStyles} from "@material-ui/core";
import GoodReceivingNoteDialog from "./GoodReceivingNoteDialog";

const useStyles = (theme) => ({
    buttonAlign: {
        textAlign: 'right', margin: theme.spacing(1),
    }
});

class NewGoodReceivingNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newGrcnContent: {
                title: 'Add Good Receiving Details',
                clickChild: click => this.clickChild = click,
                newGrcnDataReloadFunction: this.loadDataSetToMainTable,
                newGrcnData: {
                    grcnId: '', poNo: '', supplierName: '', slaveData: []
                }
            }
        }
    }

    loadDataSetToMainTable(newGrcnData) {
        alert("calling the back end to save data");
        console.log(newGrcnData);
    }

    render() {
        const {classes} = this.props;
        return (<div className={classes.buttonAlign}>
            <Button
                color="primary"
                onClick={() => this.clickChild()}
                startIcon={<AddCircleOutline/>}
            >
                Add New Good Receiving Note
            </Button>
            <GoodReceivingNoteDialog newGrcnContent={this.state.newGrcnContent}/>
        </div>);
    }
}


export default withStyles(useStyles, {withTheme: true})(NewGoodReceivingNote);
