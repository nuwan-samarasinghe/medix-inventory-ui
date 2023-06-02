import React, {Component} from 'react';
import {TableRow, TableCell, IconButton, Select} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

class EditableTableRow extends Component {

    categoryOptions = [
        {value: 'Clean Room Products'},
        {value: 'General Laboratory Products'},
        {value: 'Medical Equipment'},
        {value: 'Laboratory Consumables'}
    ];

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData
        };
    }

    handleChange = (e, field) => {
        this.setState({
            data: {...this.state.data, [field]: e.target.value},
        });
        let val = this.state.data;
        val[field] = e.target.value;
        this.props.loadSlaveData(val);
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
                    <Select
                        autoFocus margin="dense" id="category" type="text" fullWidth
                        onChange={(e) => this.handleChange(e, 'category')}
                    >
                        {this.categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="expiryDate" type="date" fullWidth
                        value={data.expiryDate}
                        onChange={(e) => this.handleChange(e, 'expiryDate')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        autoFocus margin="dense" id="receivedDate" type="date" fullWidth
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
                        autoFocus margin="dense" id="partNo" type="text" fullWidth
                        value={data.partNo}
                        onChange={(e) => this.handleChange(e, 'partNo')}
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
