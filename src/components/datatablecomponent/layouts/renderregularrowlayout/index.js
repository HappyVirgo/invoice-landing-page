/**
* Description: Render regular item column 
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";

export const regularColumn = ({getExtraKey, getDataKey, checkItem, item}) => {
    return (
        <div id={item?item['workOrderId']:""} className={'dtableCols'}>
            <span>
                <b style={{fontSize:"14px"}}>
                    {getExtraKey!==false?checkItem:item[getDataKey]}
                </b>
            </span>
        </div>
    )
}