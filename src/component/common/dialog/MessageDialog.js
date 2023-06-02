import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MessageDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    }

    componentDidMount() {
        if (this.props.messageContent.clickChildMsg) {
            this.props.messageContent.clickChildMsg(this.handleOpen);
        }
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{
                    this.props.messageContent.title != null ? this.props.messageContent.title : "Error Title"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            this.props.messageContent.message != null ? this.props.messageContent.message : "Error Message"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default MessageDialog;
