import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TableSummery from "../common/tablesummery/TableSummery";
import NewGoodReceivingNote from "./NewGoodReceivingNote";
import Typography from "@material-ui/core/Typography";
import AxiosService from "../../service/AxiosService";
import environment from "../../environment";
import MessageDialog from "../common/dialog/MessageDialog";

const useStyles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class GoodReceivingNote extends Component {

    properties;

    constructor(props) {
        super(props);
        this.properties = props;
        this.state = {
            rows: [],
            loading: true,
            msgContent: {
                title: null,
                massage: null,
                clickChildMsg: click => this.clickChildMsg = click
            }
        }
    }

    createData(
        grcnId, poNo, supplierName, supplierId, receivedDate, itemId, itemName, category, expiryDate, batchNo,
        partNo, receivedQty, location, itemUnit, status, remark) {
        return {
            grcnId,
            poNo,
            supplierName,
            supplierId,
            receivedDate,
            itemId,
            itemName,
            category,
            expiryDate,
            batchNo,
            partNo,
            receivedQty,
            location,
            itemUnit,
            status,
            remark
        };
    }

    componentDidMount() {
        new AxiosService()
            .getAxios(environment.inventoryServiceUri + '/grns', null)
            .then(async value => {
                value.data.grns.forEach(data => {
                    data.itemRequests.forEach(itemRequest => {
                        this.state.rows.push(this.createData(
                            data.grcnId,
                            data.poNo,
                            data.supplierName,
                            itemRequest.supplierId,
                            itemRequest.receivedDate,
                            itemRequest.itemId,
                            itemRequest.itemName,
                            itemRequest.category,
                            itemRequest.expiryDate,
                            itemRequest.batchNo,
                            itemRequest.partNo,
                            itemRequest.receivedQty,
                            itemRequest.location,
                            itemRequest.itemUnit,
                            itemRequest.status,
                            itemRequest.remark
                        ));
                        this.setState({
                            rows: this.state.rows,
                            loading: false,
                            msgContent: this.state.msgContent,
                            newSupplier: this.state.newSupplier,
                            searchValue: this.state.searchValue
                        })
                    })
                });
            }).catch(reason => {
            if (reason.message === 'Network Error') {
                this.setState({
                    rows: this.state.rows,
                    loading: false,
                    msgContent: {
                        title: 'Service Error',
                        message: 'Supplier service is temporary unavailable please try again later!!.',
                        clickChild: this.state.msgContent.clickChild
                    },
                    newSupplier: this.state.newSupplier,
                    searchValue: this.state.searchValue
                });
                this.clickChildMsg();
            }
        })
    }

    render() {
        let tableData = {
            headers: ['GRCN Id', 'PO No', 'Supplier Name', 'Received Date', 'Item Id', 'Item Name', 'Category', 'Expiry Date', 'Batch No', 'Part No', 'Order Qty'],
            tableRawName: 'supplier',
            dataCellNames: ['grcnId', 'poNo', 'supplierName', 'receivedDate', 'itemId', 'itemName', 'category', 'expiryDate', 'batchNo', 'partNo', 'orderedQty'],
            viewDataBy: 'grcnId',
            viewType: 'grcnInfo',
            rawData: this.state.rows,
            view: true,
            delete: true
        }
        return (
            <Card>
                <CardContent>
                    <Grid item xs={12}>
                        <Typography align="left" variant="h5" component="h2">
                            Good Receiving Note
                        </Typography>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <NewGoodReceivingNote newGrcnData={this.state.rows}/>
                            <TableSummery tableContent={tableData}/>
                        </Grid>
                    </Grid>
                </CardContent>
                <MessageDialog messageContent={this.state.msgContent}/>
            </Card>
        );

    }
}

export default withStyles(useStyles, {withTheme: true})(GoodReceivingNote);
