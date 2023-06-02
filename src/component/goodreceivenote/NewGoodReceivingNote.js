import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {AddCircleOutline} from "@material-ui/icons";
import {withStyles} from "@material-ui/core";
import GoodReceivingNoteDialog from "./GoodReceivingNoteDialog";
import AxiosService from "../../service/AxiosService";
import environment from "../../environment";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageDialog from "../common/dialog/MessageDialog";

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
                loading: false,
                title: 'Add Good Receiving Details',
                clickChild: click => this.clickChild = click,
                newGrcnDataReloadFunction: this.loadDataSetToMainTable,
                newGrcnData: {
                    poNo: '', supplierName: '', itemRequests: []
                }
            },
            msgContent: {
                title: null,
                massage: null,
                clickChildMsg: click => this.clickChildMsg = click
            },
        }
    }

    loadDataSetToMainTable = (newGrcnData) => {
        console.log(newGrcnData);
        this.setState({
            ...this.state,
            loading: true
        })
        new AxiosService()
            .postAxios(environment.inventoryServiceUri + '/grn', newGrcnData)
            .then(async value => {
                this.setState({
                    loading: false,
                    newGrcnContent: {
                        loading: false,
                        title: 'Add Good Receiving Details',
                        clickChild: click => this.clickChild = click,
                        newGrcnDataReloadFunction: this.loadDataSetToMainTable,
                        newGrcnData: {
                            poNo: '', supplierName: '', itemRequests: []
                        }
                    },
                    msgContent: {
                        title: null,
                        massage: null,
                        clickChildMsg: click => this.clickChildMsg = click
                    },
                });
            }).catch(() => {
            this.setState({
                rows: this.state.rows,
                loading: false,
                newGrcnContent: {
                    loading: false,
                    title: 'Add Good Receiving Details',
                    clickChild: click => this.clickChild = click,
                    newGrcnDataReloadFunction: this.loadDataSetToMainTable,
                    newGrcnData: {
                        poNo: '', supplierName: '', itemRequests: []
                    }
                },
                msgContent: {
                    title: 'Service Error',
                    message: 'Good receive note adding failed!!.',
                    clickChildMsg: this.state.msgContent.clickChildMsg
                }
            });
            this.clickChildMsg();
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
                <div className={classes.buttonAlign}>
                    <Button
                        color="primary"
                        onClick={() => this.clickChild()}
                        startIcon={<AddCircleOutline/>}
                    >
                        Add
                    </Button>
                    <GoodReceivingNoteDialog newGrcnContent={this.state.newGrcnContent}/>
                    <MessageDialog messageContent={this.state.msgContent}/>
                </div>
            );
        }
    }
}


export default withStyles(useStyles, {withTheme: true})(NewGoodReceivingNote);
