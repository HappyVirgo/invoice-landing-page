//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';

//Layouts
import {
    RenderNull,
    RenderNotNull
} from '..'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export const Details = ({detailsdata, wodetailsdata, history, attachments, notes, warranty, serviceProviders, currentDtlsId}) => {
    const classes = useStyles()
    
    return (
    <div className={`${classes.root} work-order-details-component`}>
        {(detailsdata!==undefined && !!wodetailsdata)?(!!detailsdata.data && !!wodetailsdata.data?(detailsdata.data.invoices!==null?<RenderNotNull detailsdata={detailsdata} wodetailsdata={wodetailsdata} history={history} attachments={attachments} notes={notes} warranty={warranty} serviceProviders={serviceProviders} />:<RenderNull />):`Selected invoice ${currentDtlsId}`):""}
    </div>
)}
