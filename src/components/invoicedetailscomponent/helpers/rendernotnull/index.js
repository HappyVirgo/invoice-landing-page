//Basic imports
import React from 'react';

//Material UI
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    DetailsImageLayout,
    MainDetails,
    MainActions,
    LinkActions,
    InvoiceDescription,
    EnhancedDetails,
    BoxedDetails,
    LocationDetails
} from '../../layouts'

//Components
import { 
    TabsComponent,
    //ModalComponent
} from '../../../../components'
const useStyles = makeStyles((theme) => ({
    boxedAndLocation: {
        display: 'flex',
        flexDirection: 'column'
    },
    detailsBox: {
        alignItems: 'flex-start'
    }
}));
export const RenderNotNull = ({detailsdata, wodetailsdata, history, attachments, notes, warranty, serviceProviders}) => {   
    const classes = useStyles()
    //In null case
    const nullVal = null;    
    //Image Section
    let image
    //Store data to display in new array
    let invoiceNum
    let assetName
    let assetId
    let assetLocation
    let invoiceId
    let woType
    let manufacturer
    let model
    let serial
    let assetType
    let warrantyLabel
    let additionalNote
    //Enhanced Section
    // let description
    let status
    // let priority
    let total
    let tradeType
    let invoiceDate
    let invoiceSerialNo
    let problemType
    let categoryType
    let nte
    let raisedNte
    //Border Section
    let currentEta
    let workOrderNum
    let workOrderStatus
    let proposalId
    let proposalStatus
    // let createdDate
    // let invoiceStatusDesc
    let serviceProvider
    let serviceProviderLast
    let serviceProviderPhoneNumber
    let assignTo
    //Location Section
    let locationAddress
    let location
    let locationPhone
    //Check PM
    let ifPM
    
    let isAvailable

    if(detailsdata!==undefined || wodetailsdata!==undefined){
        //If is a PM
        if(detailsdata.data.invoice===undefined) {
            isAvailable = true
        } else {
            
            if(detailsdata.data.invoice.asset!==nullVal) {
                ifPM = false
            } else {
                ifPM = true
            }
            // Image Section
            if(wodetailsdata.data.work_order.asset!==nullVal) {
                let pre_image = wodetailsdata.data.work_order.asset.assetImage
                image = pre_image[0]!==undefined?pre_image[0]['fileName']:nullVal;
            }         
            //Short Detail Section
            invoiceId = detailsdata.data.invoice!==nullVal?detailsdata.data.invoice.id:nullVal
            additionalNote = detailsdata.data.invoice!==nullVal?detailsdata.data.invoice.additionalNote:nullVal
            invoiceNum = detailsdata.data.invoice.invoiceNo!==nullVal?detailsdata.data.invoice.invoiceNo:nullVal
            if(wodetailsdata.data.work_order.asset!==nullVal){
                let pre_assetName = wodetailsdata.data.work_order.asset
                assetName = pre_assetName!==nullVal?wodetailsdata.data.work_order.asset.name:nullVal;
                assetId = pre_assetName!==nullVal?wodetailsdata.data.work_order.asset.id:nullVal;
            }        
            // if(detailsdata.data.work_order!==nullVal){
            //     invoiceId = wodetailsdata.data.work_order.id!==nullVal?wodetailsdata.data.work_order.invoiceId:nullVal;
            // }          
            woType = wodetailsdata.data.work_order.asset!==nullVal?wodetailsdata.data.work_order.woType:nullVal;
            if(wodetailsdata.data.work_order.asset!==nullVal){
                let pre_manufacturer = wodetailsdata.data.work_order.asset.manufacturer
                manufacturer = pre_manufacturer!==nullVal?wodetailsdata.data.work_order.asset.manufacturer.companyName:nullVal;
            }
            model = wodetailsdata.data.work_order.asset!==nullVal?wodetailsdata.data.work_order.asset.modelNumber:nullVal;
            serial = wodetailsdata.data.work_order.asset!==nullVal?wodetailsdata.data.work_order.asset.serialNumber:nullVal;
            assetType = wodetailsdata.data.work_order.assetType!==nullVal?wodetailsdata.data.work_order.assetType.name:nullVal;
            assetLocation = detailsdata.data.invoice.asset!==nullVal?(detailsdata.data.invoice.asset.location!==nullVal?detailsdata.data.invoice.asset.location.name:nullVal):nullVal;
            warrantyLabel = wodetailsdata.data.work_order.asset!==nullVal?wodetailsdata.data.work_order.warrantyAvailable:nullVal;
            // Enhanced Section
            // id = wodetailsdata.data.invoice.invoiceId!==nullVal?detailsdata.data.invoice.invoiceId:nullVal;
            // description = wodetailsdata.data.invoice.description!==nullVal?detailsdata.data.invoice.description:nullVal;
            status = detailsdata.data.invoice.statusText!==nullVal?detailsdata.data.invoice.statusText:nullVal;
            total = detailsdata.data.invoice.totalAmount!==nullVal?detailsdata.data.invoice.totalAmount:nullVal;
            invoiceDate = detailsdata.data.invoice.invoiceDate!==nullVal?detailsdata.data.invoice.invoiceDate:nullVal;
            invoiceSerialNo = detailsdata.data.invoice.invoiceSerial!==nullVal?detailsdata.data.invoice.invoiceSerial:nullVal;
            // priority = detailsdata.data.invoice.priority!==nullVal?detailsdata.data.invoice.priority.name:nullVal;
            tradeType = wodetailsdata.data.work_order.tradeType!==nullVal?wodetailsdata.data.work_order.tradeType:nullVal;
            problemType = wodetailsdata.data.work_order.problemType!==nullVal?wodetailsdata.data.work_order.problemType.name:nullVal;
            categoryType = detailsdata.data.invoice.categoryTypeText!==nullVal?detailsdata.data.invoice.categoryTypeText:nullVal;
            nte = wodetailsdata.data.work_order.nte!==nullVal?wodetailsdata.data.work_order.nte:nullVal;
            raisedNte = wodetailsdata.data.work_order.nte!==nullVal?wodetailsdata.data.work_order.raisedNte:nullVal;
            assignTo = detailsdata.data.invoice.assignedUserList!==nullVal?detailsdata.data.invoice.assignedUserList:nullVal;   
            //Bordered Section 
            // invoicetatus = detailsdata.data.invoice.invoice.length!==0?detailsdata.data.invoice.invoice.reduce((acc, crr, idx)=> acc+(idx===0?'':', ')+crr.invoicetatusDesc.description, ''):nullVal;
            // invoiceId = detailsdata.data.invoice.invoice.length!==0?detailsdata.data.invoice.invoice[0].invoiceId:nullVal;
            serviceProvider = wodetailsdata.data.work_order.serviceProviderProfile!==nullVal?wodetailsdata.data.work_order.serviceProviderProfile.companyName:nullVal;
            // serviceProvider = wodetailsdata.data.work_order.serviceProviderProfile!==nullVal?wodetailsdata.data.work_order.serviceProviderProfile.firstName:nullVal;
            // serviceProviderLast = wodetailsdata.data.work_order.serviceProviderProfile!==nullVal?wodetailsdata.data.work_order.serviceProviderProfile.lastName:nullVal;
            serviceProviderPhoneNumber = wodetailsdata.data.work_order.serviceProviderProfile!==nullVal?wodetailsdata.data.work_order.serviceProviderProfile.phoneNumber:nullVal;
            currentEta = wodetailsdata.data.work_order.currentEta!==nullVal?wodetailsdata.data.work_order.currentEta:nullVal;
            workOrderNum = wodetailsdata.data.work_order.id!==nullVal?wodetailsdata.data.work_order.id:nullVal;
            workOrderStatus = wodetailsdata.data.work_order.workOrderStatus!==nullVal?wodetailsdata.data.work_order.workOrderStatus:nullVal;
            if(wodetailsdata.data.work_order.proposal!==nullVal){
                let pre_proposalStatus = wodetailsdata.data.work_order.proposal.proposalStatus
                proposalStatus = pre_proposalStatus!==nullVal?wodetailsdata.data.work_order.proposal.proposalStatus.description:nullVal;
                proposalId = wodetailsdata.data.work_order.proposal.proposalId
            }
            // createdDate = detailsdata.data.invoice.dateCreated!==nullVal?detailsdata.data.invoice.dateCreated:nullVal;
            //Location Section
            locationAddress = wodetailsdata.data.work_order.location!==nullVal?wodetailsdata.data.work_order.location.address1:nullVal;
            location = wodetailsdata.data.work_order.location!==nullVal?wodetailsdata.data.work_order.location.name:nullVal;
            locationPhone = wodetailsdata.data.work_order.location!==nullVal?wodetailsdata.data.work_order.location.phone1:nullVal;
            
            
        }
} else {
    isAvailable = true
}        
    return(
        <div>
            {isAvailable&& <div>Something went wrong!</div>}
            {!isAvailable&& <>
            <Grid container spacing={0} className={classes.detailsBox}>
                <DetailsImageLayout
                    image={image}
                    ifPM={ifPM}
                />
                <MainDetails 
                    // workOrderId={workOrderId}
                    assetName={assetName}
                    woType={woType}
                    manufacturer={manufacturer}
                    model={model}
                    serial={serial}
                    assetType={assetType}
                    assetLocation={assetLocation}
                    warrantyLabel={warrantyLabel}
                    warranty={warranty}
                    nullVal={nullVal}
                />
                {/* <MainActions
                    serviceProviders={serviceProviders}
                    status={status}
                /> */}
            </Grid>
            <LinkActions
                workOrderId={workOrderNum}
                // invoicetatus={invoicetatus}
                invoiceId={invoiceId}
                // proposalStatus={proposalStatus}
                proposalId={proposalId}
                assetId={assetId}
            />
            <Divider/>
            <Grid container spacing={0}>
                <InvoiceDescription
                    invoiceId={invoiceId}
                    assignTo={assignTo}
                    additionalNote={additionalNote}
                    attachments={attachments}
                    // description={description}
                    nullVal={nullVal}
                />
                <EnhancedDetails 
                    status={status}
                    total={total}
                    invoiceDate={invoiceDate}
                    invoiceSerialNo={invoiceSerialNo}
                    assignTo={assignTo}
                    // priority={priority}
                    tradeType={tradeType}
                    problemType={problemType}
                    categoryType={categoryType}
                    // woType={woType}
                    nte={nte}
                    raisedNte={raisedNte}
                    nullVal={nullVal}
                />
                <Grid item className={classes.boxedAndLocation} xs={12} md={12} lg={7}>
                    <BoxedDetails 
                        proposalId={proposalId}
                        workOrderNum={workOrderNum}
                        invoiceNum={invoiceNum}
                        currentEta={currentEta}
                        // createdDate={createdDate}
                        serviceProvider={serviceProvider}
                        serviceProviderLast={serviceProviderLast}
                        serviceProviderPhoneNumber={serviceProviderPhoneNumber}
                        proposalStatus={proposalStatus}
                        workOrderStatus={workOrderStatus}
                        assignTo={assignTo}
                        nullVal={nullVal}
                    />
                    <LocationDetails
                        locationAddress={locationAddress}
                        location={location}
                        locationPhone={locationPhone}
                        nullVal={nullVal}
                    />
                </Grid>
            </Grid>
            <Divider/>  
            <TabsComponent
                history={history}
                attachments={attachments}
                notes={notes}
            />
            </>}                      
        </div>            
    )
}
        