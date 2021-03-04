/**
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */

//Basic imports
import React from "react";

//Modal
import {ModalComponent} from '../../../../components'
import {HoverCard} from '../../../../components'

//Material UI imports
import TableCell from "@material-ui/core/TableCell";
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

///Set render structure for single-item column
export const RenderSingleItem = ({ typeOfTab, getDetailsButton, getAuthorButton, getNameField, getExtraKeyLast, getExtraKey, getDataKey, checkItem, checkNameField, item, getWorkOrderId}) => {
    let firstName
    let lastName
    let data
    if(getNameField===true){
        firstName = getExtraKey!==false?checkItem:item[getDataKey]
        lastName = getExtraKeyLast!==false?checkNameField:item[getDataKey]
        data = firstName+ " " +lastName
    } else if(getDetailsButton===true) {
        data =  <ModalComponent data={item} type={typeOfTab} />
    } else if (getAuthorButton===true) {
        data = <HoverCard type="author" data={item} />
    } else {
        data = getExtraKey!==false?checkItem:item[getDataKey]
    }
    
    return (
        <TableCell id={getWorkOrderId} component="div">
                {data}
        </TableCell>
    );
}