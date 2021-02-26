/**
 * Description: Open Proposals
 * Author: Carlos Blanco
 * Created: 2/18/2021
 */
//Basic imports
import * as types from '../../constants';
import { apiOpenIV } from '../../api';


export const receiveOpenIVData = (data) => {
    return {type: types.RECEIVE_OPEN_INVOICES_DATA, data: data};
}

export const fetchOpenInvoicesData = async (token, userId) => {
    const openURL = "/open"
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
    console.log(apiOpenIV+accessUserId+openURL)
    return dispatch => {
        return fetch(apiOpenIV+accessUserId+openURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveOpenIVData(json)));
    };     
}
