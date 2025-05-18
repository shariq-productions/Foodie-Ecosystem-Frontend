import { CartContext } from "../CartContext";
import { useState } from "react";
import { ListItem } from "./ListItem";
import { AddItem } from "./AddItem";
import { TrackOrder } from "./TrackOrder";
import { DropDown } from "./AddItem";
 
export function Admin() {
    const [currOp,setcurrOp]=useState("List-Items");
    const [show,setShow]=useState(false);

    return(
        <div className="flex flex-row">
        <div className="absolute z-20 left-5 top-5">
        <DropDown title={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>    }>
            <div onClick={()=>{setcurrOp("Add Item")}} className={"m-2 " +(currOp=="Add Item"?"border-b-1":"")}>Add Item</div>
            <div onClick={()=>{setcurrOp("List-Items")}} className={"m-2 " +(currOp=="List-Items"?"border-b-1":"")}>List-Items</div>
            <div onClick={()=>{setcurrOp("Track Orders")}} className={"m-2 " +(currOp=="Track Orders"?"border-b-1":"")}>Track Orders</div>
        </DropDown>
        </div>
            {
                (currOp=="Add Item")?<AddItem setter={()=>{setcurrOp("List-Items")}}/>:((currOp=="List-Items")?<ListItem/>:<TrackOrder/>)
            }
        </div>
    )
}

