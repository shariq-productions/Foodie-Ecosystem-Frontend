import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import "../App.css"; 
import { Link, useNavigate } from "react-router";

export function Navbar()  
{
    const [menu,setMenu]=useState("home");
    const {cart} = useContext(CartContext); 
    const navigate=useNavigate();
    return (
        <div className="Navbar_Top z-20 ">
        <div className="flex">            
        <p className="Logo_style" onClick={()=>{navigate("/")}}>Foodie.</p>
        </div>  
        <div className="flex p-4 text-slate-500">
        <Link to="/#HomeBar" className={menu === 'home' ? 'underline p-2' : 'p-2'} onClick={() => setMenu('home')}>home</Link>
        <Link to="/#MenuBar" className={menu === 'menu' ? 'underline p-2' : 'p-2'} onClick={() => setMenu('menu')}>menu</Link>
        </div>
        <ul className="flex p-4  justify-items-end items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>             
        <div className="relative" onClick={()=>{navigate('/orders')}}>
        <svg  xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
        {(cart.length>0)?<p className="absolute z-10 -top-10 text-6xl -right-2 text-amber-600 disabled">.</p>:<></>}
        </div>
        <button className="Button_style" onClick={()=>{navigate("/signup")}}>Sign In</button>
        </ul>
        </div>
    )
}
