import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TableSummery from "../common/tablesummery/TableSummery";
import NewGoodReceivingNote from "./NewGoodReceivingNote";
import Typography from "@material-ui/core/Typography";

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
            loading: true
        }
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
            </Card>
        );

    }
}

export default withStyles(useStyles, {withTheme: true})(GoodReceivingNote);
