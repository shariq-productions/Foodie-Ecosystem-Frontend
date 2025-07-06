import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import "../App.css"; 
import { Link, useNavigate } from "react-router";
import {Verifier } from "./Verifiers";

export function Navbar()  
{
    const [menu,setMenu]=useState("home");
    const {quan} = useContext(CartContext);
    console.log(quan);
    const navigate=useNavigate();
    return (
        <>
        <Alert/>
        <Verifier/>
        <div className="Navbar_Top z-10 shadow-lg shadow-stone-900/60">
        <div className="flex">            
        <p className="Logo_style" onClick={()=>{navigate("/")}}>Foodie.</p>
        </div>  
        <div className="flex p-4 text-slate-500">
        <Link to="/" className={menu === 'home' ? 'underline p-2' : 'p-2'} onClick={() => setMenu('home')}>home</Link>
        <Link to="/admin" className={menu === 'menu' ? 'underline p-2' : 'p-2'} onClick={() => setMenu('menu')}>admin</Link>
        </div>
        <div className="flex flex-row justify-items-end items-center">
            <div onClick={()=>{navigate('/addresses')}} > 
<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
</div>  
            <div className="mx-2" onClick={()=>{navigate('/trackorders')}} > 
<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M224.12-161q-49.12 0-83.62-34.42Q106-229.83 106-279H40v-461q0-24 18-42t42-18h579v167h105l136 181v173h-71q0 49.17-34.38 83.58Q780.24-161 731.12-161t-83.62-34.42Q613-229.83 613-279H342q0 49-34.38 83.5t-83.5 34.5Zm-.12-60q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17Zm507 0q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17Zm-52-204h186L754-573h-75v148Z"/>
</svg>
</div>  
        <div className="relative mx-2" onClick={()=>{navigate('/orders')}}>
        <svg  xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
        {(quan>0)?<p className="absolute z-10 -top-10 text-6xl -right-2 text-amber-600 disabled">.</p>:<></>}
        </div>
        <div className="Button_style mx-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg></div>
        </div>
        </div>
        </>
    )
}

function Alert(){
    const {alert,alertMessage}=useContext(CartContext);
    // const =useContext(CartContext);
    return (
        <div className={`fixed z-30 w-screen h-screen flex flex-row-reverse  ${alert?`hidden`:``}`}>
            <div className="text-black h-min m-5 bg-slate-100/75 shadow-md shadow-slate-900 rounded-sm p-2">
                {alertMessage.current}
            </div>
        </div>
    )
}