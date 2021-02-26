//Basic Imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    cta_description_text:{
        fontSize: '12px',
        fontWeight: 'bold'
    },
    cta_assigned_value: {
        color: '#49b900;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    },
    cta_awaiting_value: {
        color: '#b600c7;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    },
    cta_pending_value: {
        color: '#FF9022;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    },
    cta_unassigned_value: {
        color: '#F20050;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    }
}));

export const CTASectionLayout = ({assignedToMeInvoices, awaitingInvoices, pendingInvoices, unassignedInvoices}) => {
    let change = useContext(GlobalContext)
    change = change.dynamicData
    //Loading custom styles Material UI
    const classes = useStyles();
    return(
        <Grid item xs={8} md={8} lg={8} className="common-cta-wo">
            <Grid item xs={4} md={4} lg={4} className="assign-to-me-invoice" id="assignedInvoice" onClick={change}>
                <Typography className={classes.cta_assigned_value} variant="h2">{assignedToMeInvoices}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Assigned to me</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} className="awaiting-invoice" id="awaitingInvoice" onClick={change}>
                <Typography className={classes.cta_awaiting_value} variant="h2">{awaitingInvoices}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Awaiting Invoice</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} className="pending-approval-invoice" id="pendingInvoice" onClick={change}>
                <Typography className={classes.cta_pending_value} variant="h2">{pendingInvoices}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Pending Approval</Typography>
            </Grid>
            {/* <Grid item xs={3} md={3} lg={3} className="unassigned-invoice" id="unassignedInvoice" onClick={change}>
                <Typography className={classes.cta_unassigned_value} variant="h2">{unassignedInvoices}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Unassigned</Typography>
            </Grid> */}
        </Grid>
    )
}

