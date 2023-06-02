import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import EditableTableRow from './EditableTableRow';

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    handleAddRow = () => {
        const newRow = {
            id: Date.now(),
            itemId: '',
            itemName: '',
            category: '',
            expiryDate: '',
            receivedDate: '',
            batchNo: '',
            orderedQty: '',
            receivedQty: '',
            location: '',
            itemUnit: '',
            status: '',
            remark: ''
        };
        this.setState((prevState) => ({
            rows: [...prevState.rows, newRow],
        }));
    };

    handleDeleteRow = (id) => {
        this.setState((prevState) => ({
            rows: prevState.rows.filter((row) => row.id !== id),
        }));
    };

    render() {
        const {rows} = this.state;
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Id</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Received Date</TableCell>
                            <TableCell>Batch Number</TableCell>
                            <TableCell>Order Quantity</TableCell>
                            <TableCell>Received Quantity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Item Unit</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Remark</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <EditableTableRow
                                key={row.id}
                                rowData={row}
                                onDelete={this.handleDeleteRow}
                            />
                        ))}
                    </TableBody>
                </Table>
                <IconButton onClick={this.handleAddRow}>
                    <Add/>
                </IconButton>
            </div>
        );
    }
}

export default EditableTable;
