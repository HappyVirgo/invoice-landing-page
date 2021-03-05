import * as types from '../../constants';
import { apiIsAccessible } from '../../api';

export const receiveIsAccessible = (data) => {
    return {type: types.RECEIVE_IS_ACCESSIBLE, data: data};
}

export const isAccessible = async (dtlsID, token, userId) => {
    const accessURL = "/access"
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
        return fetch(apiIsAccessible+dtlsID+accessURL+'?userId='+accessUserId, init)
            .then(response => response.json())
            .then(json => dispatch(receiveIsAccessible(json)));
    }
}

export const setInvoiceStatus = (data) => {
    return {type: types.SET_INVOICE_STATUS, data: data};
}

export const updateInvoiceStatus = async (updatedStatus, dtlsID, token, userId) => {
    const updateStatusURL = "/status"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessFetchUserId = (id) => {
        return id
    } 
    let accessToken = await accessFetchToken(token)
    let accessUserId = await accessFetchUserId(userId)
    let data = {
        "userId": accessUserId,
        "action": updatedStatus,
    }   
    console.log("requestData", data)
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    return dispatch => {
        return fetch(apiIsAccessible+dtlsID+updateStatusURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(setInvoiceStatus(json)))
            .catch(error => error);
    }
}
