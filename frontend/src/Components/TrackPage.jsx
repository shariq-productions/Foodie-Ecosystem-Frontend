import { useContext } from "react";
import { CartContext } from "../CartContext";

export function TrackPage(){
    const {Orders} =useContext(CartContext);
    return (
        <div className="w-full text-center">
            <div className="font-[outfit] text-3xl font-semibold m-3 underline">My Orders</div>
            <div className="inline-grid items-center p-3 m-2 w-full text-lg max-md:text-md rounded overflow-scroll ">
                <div className="border-b-2 w-full grid grid-cols-6  max-md:grid-cols-5 h-10 justify-baseline content-end bg-slate-200 text-sm font-semibold">
                <p className="max-md:hidden"></p>
                <p>Name</p>
                <p>Quantity</p>
                <p>Amount</p>
                <p>Status</p>
                <p></p>
                </div>
            {
                Orders.map((items)=>{
                    return (
                        <OrderPlaced name={items.name} quantity={items.quantity} amount={items.amount} status={items.status} />
                    )
                })
            }
            </div>
        </div>
    )
}


function OrderPlaced({name,quantity,amount,status}){
    return (

        <div className="border-b-2 text-sm border-collapse w-full grid grid-cols-6 max-sm:grid-cols-5 p-2 text-slate-700 transition-transform duration-300" style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
    }}>
        <svg className="max-sm:hidden place-self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M160-120q-33 0-56.5-23.5T80-200v-120h800v120q0 33-23.5 56.5T800-120H160Zm0-120v40h640v-40H160Zm320-180q-36 0-57 20t-77 20q-56 0-76-20t-56-20q-36 0-57 20t-77 20v-80q36 0 57-20t77-20q56 0 76 20t56 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 56-20t76-20q56 0 79 20t55 20v80q-56 0-75-20t-55-20q-36 0-58 20t-78 20q-56 0-77-20t-57-20ZM80-560v-40q0-115 108.5-177.5T480-840q183 0 291.5 62.5T880-600v40H80Zm400-200q-124 0-207.5 31T166-640h628q-23-58-106.5-89T480-760Zm0 520Zm0-400Z"/></svg>
                <p>{name}</p>   
                <p>{quantity}</p>
                <p>{amount}</p>
                <p>{status}</p>
                <button className="text-white rounded font-semibold bg-orange-400 p-1 hover:bg-amber-600 active:bg-amber-700">Track Order</button>
        </div>
    )
}