//Basic imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//Components
import { 
    CTASectionComponent, 
    DataTableComponent, 
    InvoiceDetailsComponent,
    Alert, 
} from '../../components'

//Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

//Actions
import { 
    oauthFetchToken,
    fetchUsersInformation,
    fetchCTAsData, 
    fetchSearchData,
    fetchAwaitingInvoiceData, 
    fetchPendingInvoiceData, 
    fetchDetailsInvoiceData,
    fetchDetailsWOData,
    fetchOpenInvoicesData,
    fetchAssignedToMeInvoiceData,
    fetchHistoryWOData,
    fetchNotesInvoiceData,
    fetchAttachmentsInvoiceData,
    fetchWarrantyWOData,
    // createNoteWOData,
    // updateWOStatus,
    // fetchServiceProviders,
} from '../../actions';

//Context
import { GlobalContext } from '../../context/globalcontext'


//Declaring global variables
//Token
let token
//User ID
let userId
let userData
//CTA component
let ctadata
//Datatable component
let tmpdata
let tmpDataAmount
//Details component
let detailsdata
let wodetailsdata
//Tab component
let historydata
let notesdata
let attachmentsdata
let dtlsID
let woDtlsID
let trgtID
//Search
let searchTerm
let searchBy
//Warranty
let warrantydata
//Filter
let filterByAssetType
let filterByStatus
let filterByCategory

let newNote
let newNoteAvailable
let noteDescription

let workOrderUpdateResponse
let updatedStatus
let reassignToVal
let serviceProviders

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "assignedInvoice",
            detailsId: "",
            loading: false,
            loadingDetails: false,
            loadingAll: false,
            searchTerm: "", 
            searchBy: 1,
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByCategory: 1,
            newNote: '',
            newNoteAvailable: false,
            noteDescription: '',
            workOrderUpdateResponse: '',
            updatedStatus: '',
            reassignToVal: 1,
            reassignToAvailable: false,
            itsActive: false
        };
    }    
    handleChangeStateSearchTerm = (value) => {
        searchTerm = value     
    }
    handleSearchTerm = (event) => {
        let value = event.target.value
        this.setState({
            searchTerm: value,
        }, this.handleChangeStateSearchTerm(value));
    } 
    handleChangeStateSearchBy = (value) => {
        searchBy = value  
    }    
    handleSearchBy = (event) => {
        let value = event.target.value
        this.setState({
            searchBy: value
        }, this.handleChangeStateSearchBy(value));
    }
    handleChangeStateFilterByAssetType = (value) => {
        filterByAssetType = value       
        console.log(filterByAssetType)
    }    
    handleFilterByAssetType = (event) => {
        let value = event.target.value
        this.setState({
            filterByAssetType: value,
        }, this.handleChangeStateFilterByAssetType(value))
    } 
    handleChangeStateFilterByStatus = (value) => {
        filterByStatus = value 
        console.log(filterByStatus)
    }    
    handleFilterByStatus = (event) => {
        let value = event.target.value
        this.setState({
            filterByStatus: value,
        }, this.handleChangeStateFilterByStatus(value))        
    } 
    handleChangeStateFilterByCategory = (value) => {
        filterByCategory = value       
        console.log(filterByCategory)
    }    
    handleFilterByCategory = (event) => {
        let value = event.target.value
        this.setState({
            filterByCategory: value,
        }, this.handleChangeStateFilterByCategory(value))        
    }

    handleChangeStateFilterClearAll = () => {
        filterByCategory = 1;
        filterByStatus = 1;
        filterByAssetType = 1; 
    }

    handleFilterClearAll = (event) => {
        this.setState({
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByCategory: 1,
        }, this.handleChangeStateFilterClearAll()) 
    }

    handleChangeNoteInput = (value) => {
        noteDescription = value;
        console.log("description", noteDescription)
    }
    handleNoteInput = (event) => {
        let value = event.target.value
        this.setState({
            noteDescription: value
        }, this.handleChangeNoteInput(value))
    }

    handleAddNote = (isAvailable) => {
        newNoteAvailable = isAvailable
        console.log(newNoteAvailable)
    }
    createNoteWOData = (event) => {
        this.setState({
            newNoteAvailable: !newNoteAvailable,
            loadingDetails: true
        }, this.handleAddNote(!newNoteAvailable))
    }

    handleChangeReassignToSelect = (value) => {
        reassignToVal = value
        //console.log('reassignToVal', reassignToVal)
    }
    handleReassignToSelect = (event) => {
        console.log("id", event.target)
        let value = event.target.value
        this.setState({
            reassignToVal: value
        }, this.handleChangeReassignToSelect(value))
    }

    handleUpdateStatus = (target) => {
        if(target === "CANCEL"){
            updatedStatus = "CANCELLED"
        } else {
            updatedStatus = target
        }
        console.log("updatedStatus", updatedStatus)
    }
    updateWOStatus = (event) => {
        let target = event.target.parentElement.getAttribute("status")
        if(target !== 'Reassign' && !!target) {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                // loadingDetails: true,
            }, this.handleUpdateStatus(target))
        } else {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                reassignToAvailable: !this.state.reassignToAvailable,
                // loadingDetails: true,
            }, this.handleUpdateStatus(target))
        }
    }
    handleDynamicDetails = (target) => {
        dtlsID = target 
    }           
    dynamicDetails = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            if(target.toString() !== this.state.detailsId.toString()) {
                this.setState({
                    detailsId: target,
                    loadingDetails: true
                }, this.handleDynamicDetails(target))
            }
        }else{
            target = event.target.closest('.datatable-row')
            target = target.id
            if(!!target && target.toString() !== this.state.detailsId.toString()) {
                this.setState({
                    detailsId: target,
                    loadingDetails: true
                },  this.handleDynamicDetails(target))
            }
        }
    }
    handleDynamicData = (target) => {
        trgtID = target
    }      
    dynamicData = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({
                targetId: target,
                // loading: true
            }, this.handleDynamicData(target))
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({
                targetId: target,
                // loading: true
            }, this.handleDynamicData(target))
        }
        
    }
    sortInvoiceByCreatedDate = (data) => {
        if(!!data) {
            data.sort((a, b) => b.id-a.id);
            data.sort((a, b) => {
                if(!!a.createdAt) {
                    return new Date(b.createdAt)-new Date(a.createdAt)
                }
                return new Date(b.dateCreated)-new Date(a.dateCreated)
            });
        } else {
            return;
        }
    }
    
    async componentDidMount() {
        token = await this.props.oauthFetchToken()
        //userData = await this.props.fetchUsersInformation()
        //userId = userData.userdata.user.user_id   
        //Next line it's to develop in local     
        // userId = "14580"
        userId = "2152"
        this.setState({ 
            firstLoading: true
        })
        ctadata = await this.props.fetchCTAsData()
        tmpdata = await this.props.fetchAssignedToMeInvoiceData()  
        if(tmpdata.data.invoices!==undefined) {
            this.sortInvoiceByCreatedDate(tmpdata.data.invoices);
            dtlsID = !!tmpdata.data.invoices?(!!tmpdata.data.invoices[0]?tmpdata.data.invoices[0]['id']:''):''
            this.setState({
                detailsId: dtlsID,
            })
        }
        if(!!dtlsID) {
            detailsdata = await this.props.fetchDetailsInvoiceData(dtlsID, token, userId)
            woDtlsID = detailsdata.data.invoice['workOrderId']
            wodetailsdata = await this.props.fetchDetailsWOData(woDtlsID, token)
            notesdata = await this.props.fetchNotesInvoiceData(dtlsID, token, userId)
            //serviceProviders = await this.props.fetchServiceProviders(dtlsID, token);
            attachmentsdata = await this.props.fetchAttachmentsInvoiceData(dtlsID, token)
            //historydata = await this.props.fetchHistoryWOData(dtlsID, token)
            //warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)           
        }         
        /*
        historydata = await this.props.fetchHistoryWOData()
        detailsdata = await this.props.fetchDetailsWOData()
        serviceProviders = await this.props.fetchServiceProviders();
        warrantydata = await this.props.fetchWarrantyWOData()  
        */
        // historydata = []
        // detailsdata = []
        // notesdata = []
        // serviceProviders = []
        // warrantydata = []
        // attachmentsdata = []
        this.setState({ firstLoading: false })
        trgtID = trgtID===undefined?this.state.targetId:trgtID
    }

    /**
     * handleId() => loads data changes
     * handleAsyncId() => call async functions since cannot be pass through setState as callback
     * handleChangePrevState() => trigger setState 
     * 
     * Author: Carlos Blanco
     * Date: 11/13/2020
     * Ticket: ET-735
     * */
    handleId = async(id) => {
        dtlsID = id
        //detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
        //notesdata = await this.props.fetchNotesWOData(dtlsID, token)
        //attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
        //historydata = await this.props.fetchHistoryWOData(dtlsID, token)
        //warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)                  
    }

    handleAsyncId = (id) => {
        dtlsID = id
        this.handleId(dtlsID)
    }
    //Change details data
    handleChangePrevState = (id) => {
        dtlsID = id     
        this.setState({
            detailsId: dtlsID,
            loading: true
        }, this.handleAsyncId(id))        
    }

    async componentDidUpdate(prevProps, prevState) {

        const currentState = this.state.targetId
        //const props = this.props
        const searchTermIn = this.state.searchTerm
        const searchByIn = this.state.searchBy  
        const filterByInByAssetType = this.state.filterByAssetType
        const filterByInByStatus = this.state.filterByStatus
        const filterByInByCategory = this.state.filterByCategory
        if(
            prevState.targetId !== this.state.targetId ||
            prevState.detailsId.toString() !== this.state.detailsId.toString() ||
            prevState.searchTerm !== this.state.searchTerm ||
            prevState.searchBy !== this.state.searchBy ||
            prevState.filterByAssetType !== this.state.filterByAssetType ||
            prevState.filterByStatus !== this.state.filterByStatus ||
            prevState.filterByCategory !== this.state.filterByCategory ||
            prevState.newNoteAvailable !== this.state.newNoteAvailable ||
            prevState.updatedStatus !== this.state.updatedStatus ||
            prevState.reassignToAvailable !== this.state.reassignToAvailable
        ) {
            this.setState({loading: true})
            //Clean input if lenght is 0
            if(searchTermIn.length===0) {
                this.setState({
                    searchTerm: "",
                })
            }       
            //Set/Search/Filter data for DataTable Component
            /*
            let incomingData = setSearchFilterHelper({
                tmpdata,
                searchTerm,
                searchTermIn,
                searchByIn,
                filterByInByAssetType,
                filterByInByStatus,
                filterByInByPriority,
                currentState,
                props
            })
            incomingData.then(res => {
                console.log(res)
                tmpdata = res
            })
            */
            const filterData = ({dataSearch, filterByInByAssetType=[], filterByInByStatus=[], filterByInByCategory=[]}) => {
            if(filterByInByAssetType.length>0) {
                dataSearch = dataSearch.filter(term => {
                    let notNull = term['assetName']!==null?term['assetName']:""
                    return notNull.toLowerCase().includes(filterByInByAssetType.toLowerCase())
                })
            }
            if(filterByInByStatus.length>0) {
                dataSearch = dataSearch.filter(term => {
                    let notNull = term['statusText']!==null?term['statusText']:""
                    return notNull.toLowerCase().includes(filterByInByStatus.toLowerCase())
                })
            }
            if(filterByInByCategory.length>0) {
                dataSearch = dataSearch.filter(term => {
                    let notNull = term['categoryTypeText']!==null?term['categoryTypeText']:""
                    return notNull.toLowerCase().includes(filterByInByCategory.toLowerCase())
                })                         
            }
            return dataSearch;
        }
        let tmp
        let dataSearch
        let dataSearchTemp
        //Set/Search/Filter data for DataTable Component
        /*
        let incomingData = setSearchFilterHelper({
            tmpdata,
            searchTerm,
            searchTermIn,
            searchByIn,
            filterByInByAssetType,
            filterByInByStatus,
            filterByInByPriority,
            currentState,
            props
        })
        incomingData.then(res => {
            console.log(res)
            tmpdata = res
        })
        */
        if(prevState.detailsId.toString() === this.state.detailsId.toString()) {
            switch (currentState) {
                /**
                 * All "term" arrays elements should be modified in order
                 * to work with the new APIs
                 */
                //Each case should be the CTA id
                case "assignedInvoice":
                    tmp = await this.props.fetchAssignedToMeInvoiceData()
                    dataSearch = tmp.data?tmp.data.invoices:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['id'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({dataSearch, filterByInByAssetType, filterByInByStatus, filterByInByCategory});
                    tmpdata = {
                        data: {
                            invoices: dataSearch
                        }
                    }
                    break;
                case "awaitingInvoice":   
                    tmp = await this.props.fetchAwaitingInvoiceData()
                    dataSearch = tmp.data?tmp.data.invoices:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['id'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.invoices:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({dataSearch, filterByInByAssetType, filterByInByCategory});
                    tmpdata = {
                        data: {
                            invoices: dataSearch
                        }
                    }
                    break; 
                case "pendingInvoice":   
                    tmp = await this.props.fetchPendingInvoiceData()
                    dataSearch = tmp.data?tmp.data.invoices:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['id'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.invoices:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({dataSearch, filterByInByAssetType, filterByInByCategory});
                    tmpdata = {
                        data: {
                            invoices: dataSearch
                        }
                    }
                    break;
                case "openInvoice":   
                    tmp = await this.props.fetchOpenInvoicesData()
                    dataSearch = tmp.data?tmp.data.invoices:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['id'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.invoices:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({dataSearch, filterByInByAssetType, filterByInByCategory, filterByInByStatus});
                    tmpdata = {
                        data: {
                            invoices: dataSearch
                        }
                    }
                    break;                        
                default:
                    tmp = await this.props.fetchAssignedToMeInvoiceData()
                    dataSearch = tmp.data?tmp.data.invoices:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['id'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({dataSearch, filterByInByAssetType, filterByInByStatus, filterByInByCategory});
                    tmpdata = {
                        data: {
                            invoices: dataSearch
                        }
                    }
                    break;
            }                 
        }

            //Change details data
            const handleChangePrevState = async() => {
                if(this.state.firstLoading === false && !!this.state.detailsId) {
                    token = await this.props.oauthFetchToken()
                    notesdata = await this.props.fetchNotesInvoiceData(dtlsID, token, userId)
                    attachmentsdata = await this.props.fetchAttachmentsInvoiceData(dtlsID, token)
                    detailsdata = await this.props.fetchDetailsInvoiceData(dtlsID, token, userId)
                    woDtlsID = detailsdata.data.invoice['workOrderId']
                    wodetailsdata = await this.props.fetchDetailsWOData(woDtlsID, token)
                    //serviceProviders = await this.props.fetchServiceProviders(dtlsID, token);
                    //historydata = await this.props.fetchHistoryWOData(dtlsID, token)
                    //warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)
                }
                this.setState({loadingDetails: false})
            }

            // let currentIndex =  tmpdata.data.work_orders.findIndex(this.isCurrent);
            // if(currentIndex === -1) currentIndex = 0
            console.log("tmpdata", tmpdata)
            // this.array_move(tmpdata.data.work_orders, currentIndex, 0)
            this.sortInvoiceByCreatedDate(tmpdata.data.invoices) 

            const prevSteDtls = prevState.detailsId
            const currentSteDtls = this.state.detailsId
            const tmpDtls = tmpdata.data!==undefined?
                                (!!tmpdata.data.invoices?
                                    (tmpdata.data.invoices[0]!==undefined?
                                        tmpdata.data.invoices[0]['id']:
                                        ''):''):
                                        ''
            tmpDataAmount = tmpdata.data.invoices!==undefined?tmpdata.data.invoices.length:0;
            //Choose if details preview it's based on the first response element or the selected by the user when clicks the row
            if(!!prevSteDtls &&  prevSteDtls.toString() !== currentSteDtls.toString() ) {
                this.setState({
                    detailsId: dtlsID,
                    loadingDetails: true
                }, handleChangePrevState) 
            } else {
                dtlsID = tmpDtls
                this.setState({
                    detailsId: dtlsID,
                    loadingDetails: true
                }, handleChangePrevState)
            }
            
            const prevNoteStatus = prevState.newNoteAvailable
            const currentNoteStatus = this.state.newNoteAvailable
            if( prevNoteStatus !== '' && prevNoteStatus !== currentNoteStatus) {
                newNote = await this.props.createNoteWOData(noteDescription, dtlsID, token, userId)
                this.setState({
                    newNote: newNote.data,
                    loadingDetails: true
                }, handleChangePrevState)
            }

            const prevUpdatedStatus = prevState.updatedStatus
            const currentUpdatedStatus = this.state.updatedStatus
            if( prevUpdatedStatus !== '' && prevUpdatedStatus !== currentUpdatedStatus) {
                console.log("USERID", userId)
                workOrderUpdateResponse = await this.props.updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)
                if(workOrderUpdateResponse) {
                    this.setState({
                        workOrderUpdateResponse: workOrderUpdateResponse,
                        loadingDetails: true
                    }, handleChangePrevState)
                } else {
                    alert("Server Error Occured");
                    this.setState({
                        updatedStatus: ''
                    });
                }
            }

            // console.log("dltsID", this.state.deta)
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                loading: false,
            })
        }
    }
    render() {

        const globalState = {
            dynamicDetails: this.dynamicDetails,
            dynamicData: this.dynamicData,
            handleSearchTerm: this.handleSearchTerm,
            handleSearchBy: this.handleSearchBy,
            handleFilterByAssetType: this.handleFilterByAssetType,
            handleFilterByStatus: this.handleFilterByStatus,
            handleFilterByCategory: this.handleFilterByCategory,
            handleFilterClearAll: this.handleFilterClearAll,
            createNoteWOData: this.createNoteWOData,
            updateWOStatus: this.updateWOStatus,
            handleNoteInput: this.handleNoteInput,
            handleReassignToSelect: this.handleReassignToSelect,
            reassignToVal: this.state.reassignToVal,
            currentDtlsId: this.state.detailsId,
            noteDescription: this.state.noteDescription,
            filterByStateAssetType: this.state.filterByAssetType,
            filterByStateStatus: this.state.filterByStatus,
            filterByStateCategory: this.state.filterByCategory,                        
            searchByState: this.state.searchBy,
            searchTermState: this.state.searchTerm,
        }
        return (
            <GlobalContext.Provider value={globalState}>
                <div className="work-orders-container">
                    <Alert severity="warning" variant="filled">
                        <Link href="/admin/Invoices" target="_blank" rel="noopener" color="inherit">
                            <i>Missing Something? Go to the Old Version</i>
                        </Link>
                    </Alert>
                    <Grid className="cta-section-component">
                        <CTASectionComponent 
                            ctadata={ctadata}
                            tmpdata={tmpdata}
                            targetdata={trgtID} 
                        />
                    </Grid>            
                    <Grid container className="content-section">
                        <Grid item xs={12} md={7} lg={7}>
                            <DataTableComponent
                                tmpdata={tmpdata}
                                loading={this.state.loading}
                                firstLoading={this.state.firstLoading}
                            />
                        </Grid>        
                        <Grid item xs={12} md={5} lg={5}>
                            <InvoiceDetailsComponent
                                tmpDataAmount={tmpDataAmount}
                                loadingDetails={this.state.loadingDetails} 
                                detailsdata={detailsdata}
                                wodetailsdata={wodetailsdata}
                                history={historydata} 
                                attachments={attachmentsdata} 
                                notes={notesdata}
                                serviceProviders={serviceProviders}
                                firstLoading={this.state.firstLoading}
                                currentDtlsId={this.state.detailsId}
                                warranty={warrantydata}
                            />
                        </Grid>  
                    </Grid>  
                </div>   
            </GlobalContext.Provider>                   
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    oauthFetchToken: () => dispatch(oauthFetchToken()),
    fetchCTAsData: () => dispatch(fetchCTAsData(token, userId)),   
    fetchSearchData: () => dispatch(fetchSearchData(searchTerm, searchBy, token, userId)),   
    fetchWarrantyWOData: () => dispatch(fetchWarrantyWOData(dtlsID, token)),   
    fetchPendingInvoiceData: () => dispatch(fetchPendingInvoiceData(token, userId)),
    fetchOpenInvoicesData: () => dispatch(fetchOpenInvoicesData(token, userId)),
    fetchAwaitingInvoiceData: () => dispatch(fetchAwaitingInvoiceData(token, userId)),
    fetchUsersInformation: () => dispatch(fetchUsersInformation(token)),
    fetchDetailsInvoiceData: () => dispatch(fetchDetailsInvoiceData(dtlsID, token, userId)),
    fetchDetailsWOData: () => dispatch(fetchDetailsWOData(woDtlsID, token)),
    // updateWOStatus: () => dispatch(updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)),
    // fetchServiceProviders: () => dispatch(fetchServiceProviders(dtlsID, token, userId)),
    fetchAssignedToMeInvoiceData: () => dispatch(fetchAssignedToMeInvoiceData(token, userId)),
    //fetchHistoryWOData: () => dispatch(fetchHistoryWOData(dtlsID, token)),
    fetchNotesInvoiceData: () => dispatch(fetchNotesInvoiceData(dtlsID, token, userId)),
    //createNoteWOData: () => dispatch(createNoteWOData(noteDescription, dtlsID, token, userId)),
    fetchAttachmentsInvoiceData: ()=> dispatch(fetchAttachmentsInvoiceData(dtlsID, token)),
})


const WorkOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(WorkOrdersBuilder)

export default WorkOrdersContainer;