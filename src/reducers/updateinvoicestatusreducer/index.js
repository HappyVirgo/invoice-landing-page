import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

let newState = {};
const updateInvoiceStatusReducer = handleActions({
    [types.RECEIVE_IS_ACCESSIBLE]: (state, action) => {
        newState.data = action.data;
        return newState;    
    },
    [types.SET_INVOICE_STATUS]: (state, action) => {
        newState.data = action.data;
        return newState;    
    }  
}, initialState);

export default updateInvoiceStatusReducer;