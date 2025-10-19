import { CartContext } from "../CartContext";
import { useState,useContext,useEffect } from "react";
import { ListItem } from "./ListItem";
import { AddItem } from "./AddItem";
import { TrackOrder } from "./TrackOrder";
import { DropDown } from "./AddItem";
 
export function Admin() {
    const {LogOutFunc}=useContext(CartContext);
    useEffect(() => {
        LogOutFunc();
    }, []);

    const [currOp,setcurrOp]=useState("List-Items");
    return(
        <div className="flex flex-col w-full items-center ">
        <div className="grid grid-cols-3 z-5  left-5 top-22 shadow-sm w-full mb-4 justify-items-center sticky  bg-white/90">
        <div onClick={()=>{setcurrOp("Add Item")}} className={"w-full p-1 mx-3 flex justify-center  " +(currOp=="Add Item"?"bg-amber-500 text-white shadow-md  shadow-amber-500":"")}>Add Item</div>
        <div onClick={()=>{setcurrOp("List-Items")}} className={"w-full p-1 mx-3   flex justify-center  " +(currOp=="List-Items"?"bg-amber-500 text-white shadow-md  shadow-amber-500":"")}>List-Items</div>
        <div onClick={()=>{setcurrOp("Track Orders")}} className={"w-full p-1 mx-3 flex justify-center  " +(currOp=="Track Orders"?"bg-amber-500 text-white shadow-md  shadow-amber-500":"")}>Track Orders</div>
        </div>
            {
                (currOp=="Add Item")?<AddItem setter={()=>{setcurrOp("List-Items")}}/>:((currOp=="List-Items")?<ListItem/>:<TrackOrder/>)
            }
        </div>
    )
}



