import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import {MoreHorizOutlined} from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Rating from "@material-ui/lab/Rating";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class TableSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            contentSupplier: {
                title: null,
                supplierId: null,
                clickChild: click => this.clickChild = click
            }
        }
    }

    handleMenu = (event, viewDataId, type) => {
        if (type === 'supplierInfo') {
            this.setState({
                anchorEl: event.currentTarget,
                contentSupplier: {
                    title: 'View Supplier',
                    supplierId: viewDataId,
                    clickChild: this.state.contentSupplier.clickChild
                }
            })
        } else if (type === 'billInfo') {
            this.setState({
                anchorEl: event.currentTarget,
            })
        }
    };

    handleClose = () => {
        if (this.props.tableContent.viewType === 'supplierInfo') {
            this.setState({
                anchorEl: null,
                contentSupplier: this.state.contentSupplier
            })
        } else if (this.props.tableContent.viewType === 'billInfo') {
            this.setState({
                anchorEl: null,
            })
        }
    };

    handleView = event => {
        if (this.props.tableContent.viewType === 'supplierInfo') {
            this.setState({
                anchorEl: null,
                contentSupplier: this.state.contentSupplier
            })
            this.clickChild();
        } else if (this.props.tableContent.viewType === 'billInfo') {
            this.setState({
                anchorEl: null,
            })
        }

    }

    render() {
        if (this.props.tableContent) {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label="supplier summery table">
                        <TableHead>
                            <TableRow>
                                {this.props.tableContent.headers.map(headerName => (
                                    <TableCell align="left" key={headerName}>{headerName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.tableContent.rawData.length > 0 ?
                                    this.props.tableContent.rawData.map((row) => (
                                        <TableRow key={row[this.props.tableContent.tableRawName]}>
                                            {this.props.tableContent.dataCellNames.map(cellName => {
                                                if (cellName === 'rating') {
                                                    return <TableCell
                                                        component="th"
                                                        scope="row"
                                                        key={cellName}
                                                    >
                                                        <Rating
                                                            name="read-only"
                                                            value={row[cellName]} readOnly/>
                                                    </TableCell>;
                                                } else if (cellName === 'id') {
                                                    return <TableCell
                                                        key={cellName}
                                                        align="left">{row[cellName]}
                                                    </TableCell>;
                                                } else if (cellName === 'action') {
                                                    return <TableCell
                                                        key={cellName}
                                                        align="left">
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="action"
                                                            component="span"
                                                            onClick={(event) => this.handleMenu(
                                                                event,
                                                                row[this.props.tableContent.viewDataBy],
                                                                this.props.tableContent.viewType
                                                            )}>
                                                            <MoreHorizOutlined/>
                                                        </IconButton>
                                                        <Menu
                                                            key='popupMenu'
                                                            id="menu-appbar"
                                                            anchorEl={this.state.anchorEl}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            open={Boolean(this.state.anchorEl)}
                                                            onClose={this.handleClose}>
                                                            <MenuItem
                                                                disabled={this.props.tableContent.view !== true}
                                                                data-menu-value={row[this.props.tableContent.viewDataBy]}
                                                                data-menu-type={this.props.tableContent.viewType}
                                                                onClick={this.handleView}>View</MenuItem>
                                                            <MenuItem
                                                                disabled={this.props.tableContent.delete !== true}
                                                                onClick={this.handleClose}>Delete</MenuItem>
                                                        </Menu>
                                                    </TableCell>;
                                                } else {
                                                    return <TableCell
                                                        key={cellName}
                                                        align="left">{row[cellName]}
                                                    </TableCell>;
                                                }
                                            })}
                                        </TableRow>
                                    )) : <p>No data available to preview.</p>}
                        </TableBody>
                    </Table>
                </TableContainer>);
        } else {
            return (<div>No content</div>)
        }

    }
}

export default TableSummery;
