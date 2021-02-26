/**
 * Description: Create notes component
 * Author: Kiran Nasim
 * Created: 1/22/2021
 * Ticket: EN-25
 */
//Basic imports
import * as types from '../../constants';
import { apiNotesInvoice } from '../../api/';

export const receiveNotesInvoiceData = (data) => {
    return { type: types.RECEIVE_NOTES_DATA, data: data };
}

export const addNoteInvoiceData = (data) => {
    return { type: types.ADD_NOTE, data: data }
}

export const fetchNotesInvoiceData = async(dtlsID, token, userId) => {
    const notesURL = "/note/aggregate"
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
        return fetch(apiNotesInvoice + idDtls + notesURL+"?userId="+userId, init)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesInvoiceData(json)));
    }
}

// export const createNoteWOData = async(noteDescription, dtlsID, token, userId) => {
//     const addNoteURL = "/note"
//     const accessFetchToken = (tk) => {
//         return tk.data
//     }
//     const accessDtlId = (id) => {
//         return id
//     }
//     let accessToken = await accessFetchToken(token)
//     let idDtls = await accessDtlId(dtlsID)

//     let data = {
//         userId,
//         description: noteDescription
//     }

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             Authorization: 'Bearer ' + accessToken,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     };
//     console.log("NOTES: ", apiNotesInvoice + idDtls + addNoteURL)    
//     return dispatch => {
//         return fetch(apiNotesInvoice + idDtls + addNoteURL, requestOptions)
//             .then(response => response.json())
//             .then(json => dispatch(receiveNotesInvoiceData(json)));
//     }
// }