/**
 * Description: Develop Cognito oauth scripts
 * Author: Carlos Blanco
 * Created: 8/20/2020
 * Ticket: ET-267
 */
import oauthTokenReducer from './oauthtokenreducer'
import userAccountDataReducer from './useraccountdatareducer'
import ctaSectionDataReducer from './ctasectionreducer'
import openProposalsReducer from './openproposalsreducer'
import pendingInvoicesReducer from './pendinginvoicesreducer'
import workOrderDetailsReducer from './workorderdetailsreducer'
import invoiceDetailsReducer from './invoicedetailsreducer'
import assignedInvoicesReducer from './invoiceassignedtomereducer'
import awaitingInvoicesReducer from './awaitinginvoicesreducer'
import unassignedWorkOrdersReducer from './workorderunassignedreducer'
import historyWorkOrdersReducer from './workordershistoryreducer'
import notesInvoiceReducer from './invoicesnotesreducer'
import attachmentsWorkOrdersReducer from './workorderattachmentsreducer'
import advancedSearchDataReducer from './advancedsearchreducer'
import warrantyModalReducer from './warrantymodalreducer'


export {
    oauthTokenReducer,
    userAccountDataReducer,
    ctaSectionDataReducer,
    advancedSearchDataReducer,
    openProposalsReducer,
    pendingInvoicesReducer,
    workOrderDetailsReducer,
    invoiceDetailsReducer,
    assignedInvoicesReducer,
    awaitingInvoicesReducer,
    unassignedWorkOrdersReducer,
    historyWorkOrdersReducer,
    notesInvoiceReducer,
    attachmentsWorkOrdersReducer,
    warrantyModalReducer
}