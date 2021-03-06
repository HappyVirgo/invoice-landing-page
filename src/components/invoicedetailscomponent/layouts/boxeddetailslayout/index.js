//Basic imports
import React from 'react';
import Moment from 'react-moment';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "14px",
        lineHeight: "25px"
    },
    etaSection: {
        border: "1px solid #cccccc",
        borderRadius: "5px",
        padding: "10px"
    },  
    date: {
        fontWeight: 600,
        color: "#F20050",
    }  
}));

export const BoxedDetails = ({proposalId, workOrderNum, invoiceNum, currentEta, serviceProvider, serviceProviderLast, serviceProviderPhoneNumber, proposalStatus, assignTo, workOrderStatus, nullVal}) => {
    const api_url = 'https://stage.ecotrak.com/admin/';
    const classes = useStyles()
    const smallSize = 12
    const mediumSize = 6
    let assignToDesc = assignTo!==null?`${assignTo.firstName} ${assignTo.lastName} / ${assignTo.companyName}`:nullVal
    return (
        <Grid item className={classes.etaSection}>
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Current ETA: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><span className={classes.date}>{!!currentEta?<Moment format="MMMM D, YYYY hh:mm a">{currentEta}</Moment>:nullVal}</span></Typography>
                </Grid>
            </Grid>
            {/* <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Created Date: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{createdDate!==null?createdDate:nullVal}</Moment></span></Typography>
                </Grid>
            </Grid> */}
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Service Provider: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{serviceProvider!==null?serviceProvider:nullVal} {serviceProviderLast!==null?serviceProviderLast:nullVal}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>SP Phone Number: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{serviceProviderPhoneNumber!==null?serviceProviderPhoneNumber:nullVal}</Typography>
                </Grid>
            </Grid>           
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Invoice Number: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{invoiceNum!==null?invoiceNum:nullVal}</Typography>
                </Grid>
            </Grid>  
            {/* <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Assigned To: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{assignToDesc!==null?assignToDesc:nullVal}</Typography>
                </Grid>
            </Grid>      */}
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Work Order ID: </strong></Typography>                    
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Link href={`${api_url}WorkOrders/work_order_details/${workOrderNum}`} target="_blank">
                        <Typography className={classes.text}>{!!workOrderNum?workOrderNum:nullVal}{!!workOrderStatus?` (${workOrderStatus.split('').map((c, i) => i===0?c.toUpperCase():c.toLowerCase()).join('')}) `:nullVal}</Typography>
                    </Link>
                </Grid>                              
            </Grid>             
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Proposal: </strong></Typography>                    
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Link href={`${api_url}Proposals/proposal_details/${proposalId}`} target="_blank">
                        <Typography className={classes.text}>{!!proposalId?proposalId:nullVal}{!!proposalStatus?` (${proposalStatus}) `:nullVal}</Typography>
                    </Link>
                </Grid>               
            </Grid>                    
        </Grid>
    )
}