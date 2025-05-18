import { CartTotal } from "./OrderPage";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router";

export function CheckoutPage() {
    const { total } = useContext(CartContext);
    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1  pt-10">
            <DeliveryDetails/>
            <CartTotal  total={total} Button={() => {
                return (
                        <></>    
                        )
            }} />
        </div>
    )
}
function DeliveryDetails() {
    const [check,setCheck]=useState(false)
    const Fname=useRef();
    const Lname=useRef();
    const Mail=useRef();
    const Street=useRef();
    const City=useRef();
    const State=useRef();
    const ZCode=useRef();
    const Country=useRef();
    const PhoneNo=useRef();
    const CompAddress={Fname:Fname.current, Lname:Lname.current, Mail:Mail.current,State:State.current, ZCode:ZCode.current, Country:Country.current, PhoneNo:PhoneNo.current,Street:Street.current, City:City.current} 
    return (
        <div className="flex flex-col ">
            <h1 className="text-3xl font-bold">Delivery Information</h1>
            <form className="flex flex-col mt-4">
                <div className="grid grid-cols-2">
                    <input type="text" ref={Fname} placeholder="First Name" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={Lname} placeholder="Last Name" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" ref={Mail} placeholder="Email address" className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" ref={Street} placeholder="Street" className="border border-gray-300 rounded p-2 m-2" />
                <div className="grid grid-cols-2">
                    <input type="text" ref={City} placeholder="City" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={State} placeholder="State" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <div className="grid grid-cols-2">
                    <input type="text" ref={ZCode} placeholder="Zip Code" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={Country}  placeholder="Country" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" ref={PhoneNo} placeholder="Phone Number" className="border border-gray-300 rounded p-2 m-2" />
                <OrderDone a={CompAddress}/>
            </form>
        </div>
    )
}

function OrderDone(a) {
    const date =new Date();
    const {adminList,cart,AddOrder,ClearCart}=useContext(CartContext);
    const navigate = useNavigate();
    let temp=[]
    adminList.map((item1) =>{
    let tempArray=``,NumberOfItems=0,amount=0;
    cart.map((item)=>{
        if(item.AdminID==item1){
        tempArray+=`${item.name} X ${item.quantity}\n,`;
        NumberOfItems+=item.quantity;
        amount+=item.quantity*item.value;
    }
    })
    temp.push({
        name:tempArray,
        quantity:NumberOfItems,
        status:"Order Recieved",
        amount,
        AdminID:item1,
        time:`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`
    })
    })
    
    return (
        <button type="button" className="bg-blue-500 text-white rounded-lg p-2" onClick={()=>{
           if(isValid(a)){      
            AddOrder(temp);
            ClearCart();
            navigate("/trackOrders");}
        }}>Submit</button>
    )
}
function isValid(a) {
    return true;
}