//Basic imports
import React, {useContext, useState, useEffect} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select, MenuItem } from '@material-ui/core'

import {PopupComponent} from '../../../../components'
import { GlobalContext } from "../../../../context/globalcontext";
//Icons
import {
    AddNote,
    NotFixed,
    ReAssigned,
    // Complete,
    Cancel
} from '../../../../assets/icons';

const useStyles = makeStyles((theme) => ({
    actionButton:{
        color: "#FFFFFF",
        backgroundColor: '#0072CE',
        fontWeight: 'bold',
        width: '140px',
        maxWidth: '150px',
        // minWidth: '150px',
        height: '32px',
        float: 'right',
        fontSize: '13px',
        margin: '5px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
    actionButtonOutlned:{
        color: "#0072CE",
        border: '2px solid #0072CE',
        fontWeight: 'bold',
        width: '140px',
        maxWidth: '150px',
        // minWidth: '150px',
        height: '32px',
        float: 'right',
        fontSize: '13px',
        margin: '5px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#0072CE',
            color: "#FFFFFF",
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
    MuiDialogTitle: {
        root: {
            color: 'blue'
        }
    },
    inputLabel: {
        margin: '20px'
    },
    textField: {
        minHeight: 200 
    },
    reassignForm: {
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0px',
        alignItems: 'center'
    },
    reassignSelect: {
        flex: '1',
        marginTop: 'unset !important',
    },
    disabled: {
        color: 'grey',
        backgroundColor: '#EEEEEE',
        pointerEvents: 'none'
    },
}));

// const serviceProviders = [
//     "NUCO2 Beer Blast System, call direct@ 800-472-2855 ext. 3028",
//     "General Parts Corporate Dispatch",
//     "Reddi Industries"
// ]
const updatedStatuses = [
    {
        requestValue: 'APPROVE',
        key: 'approve'
    },
    {
        requestValue: 'REJECT',
        key: 'reject'
    },
    {
        requestValue: 'NOT_FIX',
        key: 'notFixed'
    }
]
export const MainActions = ({serviceProviders, status, isAccessibleVal={data: {response: {}}}}) => {
    const [error, setError] = useState(false);
    const noteFunc = useContext(GlobalContext)
    const addNote = noteFunc.createNoteWOData
    const chageInputNote = noteFunc.handleNoteInput
    let noteDescription = noteFunc.noteDescription
    useEffect(() => {
        setError(noteDescription === '' || noteDescription.length > 1000);
    })
    const updateInvoiceStatus = noteFunc.updateInvoiceStatus
    const reassignedTo = noteFunc.handleReassignToSelect
    const reassignToVal = noteFunc.reassignToVal
    //console.log('serviceProviders', serviceProviders)
    const classes = useStyles()
    const noteIncludeContent = (changeStatus) => <div>
                                <FormControl required error={error} component="fieldset" style={{width:'100%'}}>
                                    <FormLabel className={classes.inputLabel} component="legend">Are you sure to set state to '{changeStatus}'? Plz leave your note(1,000 character max)</FormLabel>
                                    <TextField onChange={chageInputNote} fullWidth={true} multiline={true} variant="outlined" InputProps={{ classes: { input: classes.textField } }}/>
                                </FormControl>
                                <FormControl required>
                                </FormControl>
                            </div>
    const reassignContent = <div>
                        <FormControl component="fieldset" variant="outlined" className={classes.reassignForm} style={{width: '100%', display:'flex'}}>
                            <FormLabel className={classes.inputLabel}>Select Service Provider:</FormLabel>
                            <Select
                                labelId="assigned-to-label"
                                id="assigned-to-label"
                                className={classes.reassignSelect}
                                onChange={reassignedTo}
                                value={reassignToVal}
                                MenuProps = {{
                                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    transformOrigin: { vertical: "top",horizontal: "left" },
                                    getContentAnchorEl: null
                                }}
                            >
                                <MenuItem 
                                    value={1}
                                    disabled
                                >Service Providers</MenuItem>
                                {serviceProviders?(serviceProviders.data.assignTrades.map((item, index) => {
                                    return (
                                        <MenuItem 
                                            key={index}
                                            value={item.assignId}
                                        >{item.serviceProviderProfile.companyName}</MenuItem>
                                    )
                                })):(<MenuItem
                                        value={2}
                                        disabled
                                    >No available service provider</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
    return (
        <Grid item xs={12} md={12} lg={4} className="action-button-grid">
            <PopupComponent btnClasses={`${classes.actionButton} ${!!isAccessibleVal.data?((!isAccessibleVal.data.response[updatedStatuses[0].key]||(status !== ("Pending Approval" || "Approval in Process")))&&classes.disabled):classes.disabled}`} btn1Classes={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButtonOutlned} action-button`} status={updatedStatuses[0].requestValue} buttonLabel="Approve" onSubmit={updateInvoiceStatus} content="Are you sure to set state to 'Approve'?" />
            <PopupComponent btnClasses={`${classes.actionButton} ${!!isAccessibleVal.data?((!isAccessibleVal.data.response[updatedStatuses[1].key]||(status !== ("Pending Approval" || "Approval in Process")))&&classes.disabled):classes.disabled}`} btn1Classes={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButtonOutlned} action-button`} status={updatedStatuses[1].requestValue} buttonLabel="Reject" onSubmit={updateInvoiceStatus} content={noteIncludeContent(updatedStatuses[1].requestValue)} />
            <PopupComponent btnClasses={`${classes.actionButton} ${!!isAccessibleVal.data?((!isAccessibleVal.data.response[updatedStatuses[2].key]||(status !== ("Pending Approval" || "Approval in Process")))&&classes.disabled):classes.disabled}`} btn1Classes={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButtonOutlned} action-button`} status={updatedStatuses[2].requestValue} buttonLabel="Not Fixed" onSubmit={updateInvoiceStatus} content={noteIncludeContent(updatedStatuses[2].requestValue)} />
            {/* <PopupComponent buttonLabel="ADD NOTE" modalTitle="Add Notes" btn1Classes={`${classes.actionButton} action-button`} btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButtonOutlned} action-button`} btnStartIcon={<AddNote/>} btn2Label="Cancel" btn1Func={addNote} btn1Label="Submit" MuiDialogTitle={classes.MuiDialogTitle} content={addNoteContent} />
            <PopupComponent buttonLabel="Not Fixed" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <PopupComponent buttonLabel="Reassign" modalTitle="Reassign" reassignToVal={reassignToVal} btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButtonOutlned} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<ReAssigned/>}  btn2Label="Cancel" btn1Label="Reassign" btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content={reassignContent} /> */}
            {/* <PopupComponent buttonLabel="" modalTitle="Add Notes" btn1Classes={`${classes.actionButton} action-button`} btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButtonOutlned} action-button`} btn2Label="Cancel" btn1Func={addNote} btn1Label="Submit" MuiDialogTitle={classes.MuiDialogTitle} content={addNoteContent} />
            <PopupComponent buttonLabel="" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <PopupComponent buttonLabel="" modalTitle="Reassign" reassignToVal={reassignToVal} btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButtonOutlned} action-button`} btn1Classes={`${classes.actionButton} action-button`}  btn2Label="Cancel" btn1Label="Reassign" btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content={reassignContent} /> */}
            {/* <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Complete?" /> */}
            {/* <PopupComponent buttonLabel="" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Are you sure you want to change the status to Cancel?" /> */}
            {/* <PopupComponent buttonLabel="Cancel" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Cancel/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Are you sure you want to change the status to Cancel?" /> */}
        </Grid>
    )
}