/**
 * Description: Create CTA Components
 * Author: Kiran Nasim
 * Created: 1/6/2021
 */
//Basic imports
import * as types from '../../constants';
import { apiAwaitingInvoice } from '../../api';


export const receiveAwaitingInvoiceData = (data) => {
    return {type: types.RECEIVE_AWAITING_INVOICE_DATA, data: data};
}

export const fetchAwaitingInvoiceData = async (token, userId) => {
    const awaitingURL = "/awaiting-invoice"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessFetchUserId = (id) => {
        return id
    }    
    let accessToken = await accessFetchToken(token)
    let accessUserId = await accessFetchUserId(userId)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    return dispatch => {
        return fetch(apiAwaitingInvoice+accessUserId+awaitingURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveAwaitingInvoiceData(json)));
    }
}
