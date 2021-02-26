/**
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */

//Basic imports
import React from "react";

//Date Format
import Moment from 'react-moment';

//Material UI imports
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";

//Excerpt 
import excerptHtml from "excerpt-html"

//Modal
import {ModalComponent} from '../../../../components'

const useStyles = makeStyles(theme => ({
    rowTitle: {
        color: "#0072CE"
    }
}));

//Set render structure for multi-item column
export const RenderMultiItem = ({
    getDataKeyWo,
    getDataKeyWoDate,
    getDataKeyWoUser,
    getDataKeyWoCompany,
    getDataKeyPrps,
    getDataKeyPrpsDate,
    getDataKeyPrpsUser,
    getDataKeyPrpsCompany,
    getDataKeyInvs,
    getDataKeyInvsDate,
    getDataKeyInvsUser,
    getDataKeyInvsCompany,
    item,
    }) => {
    const classes = useStyles();
    let id
    let describer
    let company
    let firstName
    let lastName
    let date
    if (item[getDataKeyWo] || item[getDataKeyWo] === "") {
        id = getDataKeyWo
        describer = "Work Order Note"
        company = !!item[getDataKeyWoUser]?item[getDataKeyWoUser][getDataKeyWoCompany]:[]
        firstName = !!item[getDataKeyWoUser]?item[getDataKeyWoUser]['firstName']:[]
        lastName = !!item[getDataKeyWoUser]?item[getDataKeyWoUser]['lastName']:[]
        date = item[getDataKeyWoDate]
    } else if (item[getDataKeyPrps] || item[getDataKeyPrps]=== "") {
        id = getDataKeyPrps
        describer = "Proposal Note"
        company = !!item[getDataKeyPrpsUser]?item[getDataKeyPrpsUser][getDataKeyPrpsCompany]:[]
        firstName = !!item[getDataKeyPrpsUser]?item[getDataKeyPrpsUser]['firstName']:[]
        lastName = !!item[getDataKeyPrpsUser]?item[getDataKeyPrpsUser]['lastName']:[]
        date = item[getDataKeyPrpsDate]
    } else if (item[getDataKeyInvs] || item[getDataKeyInvs] === "") {
        id = getDataKeyInvs
        describer = "Invoice Note"
        company = !!item[getDataKeyInvsUser]?item[getDataKeyInvsUser][getDataKeyInvsCompany]:[]
        firstName = !!item[getDataKeyInvsUser]?item[getDataKeyInvsUser]['firstName']:[]
        lastName = !!item[getDataKeyInvsUser]?item[getDataKeyInvsUser]['lastName']:[]
        date = item[getDataKeyInvsDate]
    }
    return (
        <TableCell id={item[id]} component="div">
            <strong className={classes.rowTitle}>{describer} - <Moment format="MMMM D, YYYY hh:mm a">{date}</Moment> {company.length?`/ ${company}`:''} {firstName.length?`/ ${firstName} ${lastName}`:''}</strong><br/>
            {item[id]&&<span>{excerptHtml(item[id], {
                pruneLength: 80, // Amount of characters that the excerpt should contain
            })}</span>}
            <ModalComponent
                data={item}
            />
        </TableCell>
    );
}