import React, {Component} from 'react';
import {TableRow, TableCell, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import TextField from "@material-ui/core/TextField";

class EditableTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.rowData,
        };
    }

    handleChange = (e, field) => {
        this.setState({
            data: {...this.state.data, [field]: e.target.value},
        });
    };

    handleDelete = () => {
        this.props.onDelete(this.state.data.id);
    };

    render() {
        const {data} = this.state;

        return (
            <TableRow>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="itemId" type="itemId" fullWidth
                        value={data.itemId}
                        onChange={(e) => this.handleChange(e, 'itemId')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="itemName" type="text" fullWidth
                        value={data.itemName}
                        onChange={(e) => this.handleChange(e, 'itemName')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="category" type="text" fullWidth
                        value={data.category}
                        onChange={(e) => this.handleChange(e, 'category')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="expiryDate" type="text" fullWidth
                        value={data.expiryDate}
                        onChange={(e) => this.handleChange(e, 'expiryDate')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="receivedDate" type="text" fullWidth
                        value={data.receivedDate}
                        onChange={(e) => this.handleChange(e, 'receivedDate')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="batchNo" type="text" fullWidth
                        value={data.batchNo}
                        onChange={(e) => this.handleChange(e, 'batchNo')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="orderedQty" type="text" fullWidth
                        value={data.orderedQty}
                        onChange={(e) => this.handleChange(e, 'orderedQty')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="receivedQty" type="text" fullWidth
                        value={data.receivedQty}
                        onChange={(e) => this.handleChange(e, 'receivedQty')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="location" type="text" fullWidth
                        value={data.location}
                        onChange={(e) => this.handleChange(e, 'location')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="itemUnit" type="text" fullWidth
                        value={data.itemUnit}
                        onChange={(e) => this.handleChange(e, 'itemUnit')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="status" type="text" fullWidth
                        value={data.status}
                        onChange={(e) => this.handleChange(e, 'status')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="remark" type="text" fullWidth
                        value={data.remark}
                        onChange={(e) => this.handleChange(e, 'remark')}
                    />
                </TableCell>
                <TableCell>
                    <IconButton onClick={this.handleDelete}>
                        <Delete/>
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

export default EditableTableRow;
