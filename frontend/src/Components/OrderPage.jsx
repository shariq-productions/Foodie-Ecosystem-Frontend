import {useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router";

export function OrderPage() {

    const {cart,activeCart,accessToken} = useContext(CartContext);
    useEffect(()=>{
            activeCart();
    },[accessToken])
    console.log("Cart",cart);
    const navigate=useNavigate();
    let total=0;
    let adminL=0;
    return (
        <>
            <div className="shadow-lg overflow-scroll inline-grid rounded-lg p-4 my-10">
            <div className="grid grid-cols-6 font-[outfit] text-center text-lg border-b-2 border-gray-300 py-2">
                <div>Admin</div>
                <div>Title</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
                <div>Remove</div>
            </div>
                {   
                    
                   cart.admin?cart.admin.map((item1) => {
                    adminL++;
                        return (                        
                            item1.items.map((item)=>{
                                total+=item.price*item.quantity;
                        return <OrderedFood
                            adminID={item1.admin_id}
                            key={item.item_id}
                            name={item.item_name}
                            price={item.price}
                            quantity={item.quantity}
                            id={item.item_id}
                        />
                            })
                        )
                        
                    }
                ):<></>
                }
            </div>
            <CartTotal total={total} adminL={adminL} Button={() => {
                return (
                    <button className="bg-orange-400 text-white rounded-lg mt-4 active:bg-orange-500" onClick={()=>{navigate("/pay")}}>Check Out</button>
                )
            }}/>
        </>
    )

function OrderedFood({adminID,name,price,quantity,id}){
    const {RemoveAt} = useContext(CartContext);
    return (
    <div className="grid grid-cols-6 font-[outfit] text-center text-lg max-md:text-md border-b-2 border-gray-300 py-2">
                <div>{adminID}</div>
                <div>{name}</div>
                <div>{quantity}</div>
                <div>${price}</div>
                <div>${price*quantity}</div>
                <button 
                className="place-self-center"
                onClick={() => {
                    RemoveAt(id);
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></button>
            </div>
    )
}
}

export function CartTotal({total,adminL,Button}){
    const {setTotal} = useContext(CartContext);
    setTotal(Math.round(total * 100) / 100);
    return (
        <div className=" inline-flex flex-col w-full max-w-96 h-min font-[outfit] shadow-lg rounded-lg p-4">
                <h1 className="border-b-2 text-xl font-semibold">Cart Total</h1>
                <div className="flex flex-row justify-between w-full text-lg">
                    <p >Cost</p>
                    <p >${Math.round(total * 100) / 100}</p>
                </div>
                <div className="flex flex-row justify-between w-full text-sm font-extralight">
                    <p >Delivery Charges </p>
                    <p >${0*adminL}</p> 
                </div>
                <div className="flex flex-row justify-between w-full text-lg font-semibold">
                    <p >Total</p>
                    <p >${(Math.round(total * 100) / 100+0*adminL)}</p>
                </div>
                {Button()}
            </div>
    )
}