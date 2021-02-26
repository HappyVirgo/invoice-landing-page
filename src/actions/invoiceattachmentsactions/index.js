/**
 * Description: Create Attachments Component
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-258
 */
//Basic imports
import * as types from '../../constants';
import { apiAttachmentsWO } from '../../api';


export const receiveAttachmentsInvoiceData = (data) => {
    return {type: types.RECEIVE_ATTACHMENTS_INVOICE_DATA, data: data};
}

export const fetchAttachmentsInvoiceData = async (dtlsID, token) => {
    const attachmentsURL = "/attachments"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessDtlId = (id) => {
        return id
    }    
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    return dispatch => {
        return fetch(apiAttachmentsWO+idDtls+attachmentsURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveAttachmentsInvoiceData(json)));
    }
}
