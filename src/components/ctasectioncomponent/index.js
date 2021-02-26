/**
 * Description: Create CTA components
 * Author: Carlos Blanco
 * Created: 9/1/2020
 * Ticket: ET-242
 */

//Basic Imports
import React from 'react';
//import PropTypes from 'prop-types';

//Material UI
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    FeaturedCTALayout,
    CTASectionLayout
} from './layouts'

//Components
import { 
    AdvancedSearchComponent,
    FilteringComponent
} from '../index'

const CTASectionComponent = ({ctadata, tmpdata, targetdata}) => {

    //Process to retrieve user data 
    let assignedToMeInvoices
    let awaitingInvoices
    let pendingInvoices
    let unassignedInvoices
    let openInvoices
    /** Wait until data is already fetched
     ** Then assign values to variables
     * */
    if(ctadata!==undefined) {
        assignedToMeInvoices = ctadata.data.invoicesAssignedToMe
        awaitingInvoices = ctadata.data.awaitingInvoice
        pendingInvoices = ctadata.data.pendingAcceptance
        //unassignedInvoices = ctadata.data.unassignedInvoices
        // emergencyWorkOrders = ctadata.data.emergencyWorkOrders
        openInvoices = ctadata.data.openInvoices
    }

    return (
            <Grid container className="cta-component">
                <Grid item xs={12} md={5} lg={6} className="search-section">
                    <h1>Invoices</h1>
                    <AdvancedSearchComponent />
                    <FilteringComponent
                        tmpdata={tmpdata}
                        targetdata={targetdata}
                    />
                </Grid>
                <Grid item xs={12} md={7} lg={6} className="cta-section">
                    <FeaturedCTALayout
                        // emergencyWorkOrders={emergencyWorkOrders}
                        openInvoices={openInvoices} 
                    />
                    <CTASectionLayout
                        assignedToMeInvoices={assignedToMeInvoices}
                        awaitingInvoices={awaitingInvoices} 
                        pendingInvoices={pendingInvoices} 
                        
                    />
                </Grid>
            </Grid>
    );
};

export default React.memo(CTASectionComponent);
