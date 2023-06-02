import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditableTable from "./components/EditableTable";

const useStyles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class GoodReceivingNoteDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            dataValue: null,
            loading: false,
            newGrcnData: this.props.newGrcnContent.newGrcnData
        }
    }

    componentDidMount() {
        if (this.props.newGrcnContent.clickChild) {
            this.props.newGrcnContent.clickChild(this.handleClickOpen);
        }
    }

    handleClickOpen = () => {
        this.setState({
            openDialog: true,
            loading: false,
            newGrcnData: this.state.newGrcnData
        })
    };

    handleClose = () => {
        this.setState({
            openDialog: false,
            loading: false,
            newGrcnData: this.state.newGrcnData
        })
    };

    handleSave = () => {
        this.setState({
            openDialog: false,
            loading: false,
            newGrcnData: this.state.newGrcnData
        });
        this.props.newGrcnContent.newGrcnDataReloadFunction(this.state.newGrcnData);
    };

    removeObjectAndPushNew = (array, idToRemove, newObject) => {
        // Filter out the object with the specified ID
        const filteredArray = array.filter(obj => obj.id !== idToRemove);
        // Push the new object to the filtered array
        filteredArray.push(newObject);
        return filteredArray;
    }

    handleChange = (e, field) => {
        this.setState({
            newGrcnData: {...this.state.newGrcnData, [field]: e.target.value},
        });
    };

    loadSlaveData = (newItemRequests) => {
        let data = this.state.newGrcnData;
        data.itemRequests = this.removeObjectAndPushNew(data.itemRequests, newItemRequests.id, newItemRequests);
        this.setState({
            openDialog: this.state.openDialog,
            loading: this.state.loading,
            newGrcnData: data
        })
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return (
                <Backdrop
                    className={classes.backdrop}
                    open={this.state.loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            );
        } else {
            return (
                <div>
                    <Dialog
                        fullWidth
                        maxWidth="xl"
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{this.props.newGrcnContent.title}</DialogTitle>
                        <DialogContent>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                <Grid item xs={6}>
                                    <TextField autoFocus margin="dense" id="name" label="Purchase Order No" type="text"
                                               onChange={(e) => this.handleChange(e, 'poNo')}
                                               fullWidth/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField autoFocus margin="dense" id="name" label="Supplier Name" type="text"
                                               onChange={(e) => this.handleChange(e, 'supplierName')}
                                               fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                <Grid item xs={12}>
                                    <EditableTable loadSlaveData={this.loadSlaveData}/>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSave.bind(this)} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}

export default withStyles(useStyles, {withTheme: true})(GoodReceivingNoteDialog);
