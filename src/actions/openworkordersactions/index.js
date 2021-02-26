/**
 * Description: Create CTA Components
 * Author: Kiran Nasim
 * Created: 1/6/2021
 */
//Basic imports
import * as types from '../../constants';
import { apiopenIV } from '../../api';


export const receiveopenIVData = (data) => {
    return {type: types.RECEIVE_OPEN_WO_DATA, data: data};
}

export const fetchopenIVData = async (token, userId) => {
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
    return dispatch => {
        return fetch(apiopenIV+accessUserId+openURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveopenIVData(json)));
    }
}
