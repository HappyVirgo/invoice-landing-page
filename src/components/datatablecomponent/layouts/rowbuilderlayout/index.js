//Basic imports
import React, { useContext } from "react";
import clsx from "clsx";

//Material UI
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

//Layouts
import { 
    renderMultiItem,
    renderSingleItem,
    renderImage
} from '../index'

//Constants
// const ROW_SIZE = 140;
//Building rows

export const Row = ({ index, style, data: { columns, items, classes, span } }) => {
    const item = items[index];
    // console.log("item", item) 
    let invoiceID = item?item.id:""
    let change = useContext(GlobalContext)
    const currentDtlsId = change.currentDtlsId
    change = change.dynamicDetails
    const Body = (
        <>
        {span}
        <TableRow component="div" className={`${classes.row} datatable-row ${invoiceID.toString() === currentDtlsId.toString()?'selected':''}`} id={invoiceID} onClick={change} style={style}>
            {columns.map((column, colIndex) => {
                //Check for null items 
                let checkItem
                //Capturing data 
                let getExtraKey = column.extraKey
            let getDataKey = column.dataKey
            let getMultiItem = column.multi_item
            let getImage = column.image
            let getImgPath = column.imgPath
            let getServiceProvider_index = column.serviceprovider_index
            let getServiceProvider = column.serviceprovider
            let getInvoiceId = column.invoiceid
            let getInvoiceDate = column.invoicedate
            let getTotalAmount = column.invoicetotal
            //Check if object value are null and avoid broken loops 
            let firstCheck = item?item[getDataKey]:null
            let fullCheck = getExtraKey?item[getDataKey][getExtraKey]:firstCheck
            checkItem = !item?checkItem=null:fullCheck
            return (
            <TableCell
                key={!item?"":item['id'] * colIndex}
                component="div"
                variant="body"
                align={column.numeric || false ? "right" : "left"}
                className={clsx(
                classes.cell,
                // !column.width && classes.expandingCell
                classes.expandingCell
                )}
                // style={{
                // flexBasis: column.width || false,
                // // height: ROW_SIZE
                // }}
            >
                {
                    (getMultiItem===true)?

                        renderMultiItem({getExtraKey, checkItem, item, getServiceProvider, getServiceProvider_index, getInvoiceId, getInvoiceDate, getTotalAmount, change}):

                    ((getImage===true)?
                        renderImage({getImgPath, getExtraKey, getDataKey, checkItem, item, getInvoiceId}):
                        renderSingleItem({getExtraKey, getDataKey, checkItem, item, getInvoiceId})
                    )
                }
            </TableCell>
            );
        })}
        </TableRow>  
        </>      
    )    
    const BodyEmpty = (
        <div></div>
    )
    return (
        <>
        {item?Body:BodyEmpty}
        </>
    );
};