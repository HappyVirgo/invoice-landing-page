//Basic Imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    cta_emergency_text: {
        color: '#FFFFFF;',
        fontSize: '12px',
        fontWeight: 400,
        maxWidth: '100px',
        marginLeft: '10px'
    },
    cta_emergency_value: {
        color: '#FFFFFF;',
        fontSize: '32px',
        float: 'left',
        fontWeight: 400
    },
    cta_open_text: {
        color: '#FFFFFF;',
        fontSize: '12px',
        fontWeight: 400,
        maxWidth: '100px',
        marginLeft: '10px'
    },
    cta_open_value: {
        color: '#FFFFFF;',
        fontSize: '32px',
        float: 'left',
        fontWeight: 400
    }
}));

export const FeaturedCTALayout = ({
    emergencyWorkOrders,
    openInvoices
    }) => {
    //Setting function from context
    let change = useContext(GlobalContext)
    change = change.dynamicData
    //Loading custom styles Material UI
    const classes = useStyles();
    //let openInvoices = 5000
    const openIV = (
        <Grid item className="open-invoice" id="openInvoice" onClick={change}>
            <Typography className={classes.cta_open_value} variant="body1">{openInvoices}</Typography>
            <Typography className={classes.cta_open_text} variant="body1">Open Invoices</Typography>
        </Grid>
    )       
    return(
        <Grid item xs={4} md={4} lg={4} className="featured-cta-wo">
            {openInvoices<5000?openIV:""}
            {/*<Grid item className="open-wo" id="openIV" onClick={change}>
                <Typography className={classes.cta_open_value} variant="body1">{openIVrkOrders}</Typography>
                <Typography className={classes.cta_open_text} variant="body1">Open Work Orders</Typography>
            </Grid> */}
        </Grid>
    )
}

