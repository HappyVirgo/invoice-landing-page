/**
 * Description: Create Invoice Details Component
 * Author: Kiran Nasim
 * Created: 1/21/2021
 * Ticket: EN-7
 */
//Basic imports
import * as types from '../../constants';
import { apiDetailsInvoice } from '../../api';

const accessFetchToken = (tk) => {
    return tk.data
}
const accessDtlId = (id) => {
    return id
}

export const receiveDetailsInvoiceData = (data) => {
    return {type: types.RECEIVE_DETAILS_INVOICE_DATA, data: data};
}

export const fetchDetailsInvoiceData = async (dtlsID, token, userId) => {   
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    } 
    return dispatch => {
        return fetch(apiDetailsInvoice+idDtls+"?userId="+userId, init)
            .then(response => response.json())
            .then(json => dispatch(receiveDetailsInvoiceData(json)));
    }
}
