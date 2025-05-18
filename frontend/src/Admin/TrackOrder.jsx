import { useContext } from "react";
import { CartContext } from "../CartContext";

export function TrackOrder(){
    const {Orders} =useContext(CartContext);
    return (
        <div className="text-center">
            <div className="font-[outfit] text-3xl font-semibold m-3 ">Orders</div>
            {
                Orders.map((items,index)=>{
                    return (
                        <OrderPlaced currOD={items} index={index} />
                    )
                })
            }
        </div>
    )
}


function OrderPlaced({currOD,index}){
    const {Orders,SetOrders}=useContext(CartContext);
    const NewOrders=Orders.filter((item,ind)=>{
        return index!=ind;
    })
    return (
        <div className="grid grid-cols-5 border-2 justify-around font-semibold items-center border-slate-600 p-3 m-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"/></svg>                <p>{currOD.name}</p>
                <p>{currOD.quantity}</p>
                <p>{currOD.amount}</p>
                <DropDown title={currOD.status}>
                    <button type="button" key={index} onClick={()=>{SetOrders([...NewOrders,{...currOD,status:"Order Recieved"}]
                        )}} className=" bg-white w-full inset-shadow-slate-500/40 hover:inset-shadow-slate-700/70 inset-shadow-sm ">Order Recieved</button>
                         <button type="button" key={index} onClick={()=>{SetOrders([...NewOrders,{...currOD,status:"Out for Delivery"}]
                        )}} className=" m-1 bg-white w-full inset-shadow-slate-500/40 hover:inset-shadow-slate-700/70 inset-shadow-sm ">Out for Delivery</button>
                         <button type="button" key={index} onClick={()=>{SetOrders([...NewOrders,{...currOD,status:"Delivered"}]
                        )}} className=" m-1 bg-white w-full inset-shadow-slate-500/40 hover:inset-shadow-slate-700/70 inset-shadow-sm ">Delivered</button>
                        <button type="button" key={index} onClick={()=>{SetOrders([...NewOrders,{...currOD,status:"Cancelled"}]
                        )}} className="Central_Default m-1 bg-white w-full inset-shadow-slate-500/40 hover:inset-shadow-slate-700/70 inset-shadow-sm ">Cancelled</button>
                </DropDown>
            </div>
    )
}

function DropDown({title,children}) {
    
    return (<div className="dropdown mt-2 ">
  <button className="dropbtn w-full  bg-orange-400 p-2 text-white rounded flex flex-row items-center justify-center">{title} <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-360 280-560h400L480-360Z"/></svg></button>
  <div className="dropdown-content m-2 w-full bg-white rounded p-2 shadow-sm ml-0 mt-0">
    {children}
  </div>
</div>)
}