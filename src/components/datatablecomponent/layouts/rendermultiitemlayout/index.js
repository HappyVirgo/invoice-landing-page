/**
* Description: Check for multi-item column 
* Author: Carlos Blanco
* Date: 9/8/2020
* Ticket: ET-249 
* */
//Basic imports
import React from "react";
import CurrencyFormat from 'react-currency-format';

//Set render structure for multi-item column
export const renderMultiItem = ({getExtraKey, checkItem, item, getServiceProvider, getInvoiceId, getInvoiceDate, getTotalAmount, change}) => {
    // console.log(getCategoryType_index, getCategoryType)
    let assetInvoice = item?item['id']:null
    let invoiceDate = item[getInvoiceDate]
    let totalAmount = item[getTotalAmount]
    let getServiceProviderDef = item?item[getServiceProvider]:null
    return (
        <div id={assetInvoice} className={'dtableCols'}>
            <strong>{checkItem!==null?checkItem:assetInvoice}</strong><br/>
            <span><small>Service Provider: <b>{getServiceProviderDef!==null?getServiceProviderDef:" "}</b></small></span><br/>
            <span><small>Invoice Total: <b><CurrencyFormat value={totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></small></span><br/>
            <span><small>Invoice Date: <b>{!!invoiceDate?invoiceDate.toString().substring(0, 10):null}</b></small></span><br/>
            <span><small>Invoice ID: <b>{assetInvoice}</b></small></span><br/>
        </div>
    );
}