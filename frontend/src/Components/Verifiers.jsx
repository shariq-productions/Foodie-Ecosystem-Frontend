import React, {useContext, useState ,memo,useRef, use } from "react";
import "../App.css";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router";


export function SignUp() {
    const name=useRef();
    const email=useRef();
    const password=useRef();
    const navigate=useNavigate();
    
    return (
        <div className="Central_Default w-min font-[outfit] bg-white border-2 border-gray-300 shadow-lg rounded-lg p-8 " style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards"
    }} >
            <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
            <form className="flex flex-col space-y-4">
                <input type="text" ref={name} placeholder="Username" className="p-2 border rounded"/>
                <input type="email" ref={email} placeholder="Email" className="p-2 border rounded"/>
                <input type="password" ref={password} placeholder="Password" className="p-2 border rounded"/>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-800" onClick={()=>{console.log(name.current.value,email.current.value,password.current.value)}}>Sign Up</button>
            </form>
            <div>Already have an account? <div onClick={()=>{navigate("/login")}} className="underline">login</div></div>
        </div>
    );
}

export function Login() {
    const email=useRef();
    const password=useRef();
    const navigate=useNavigate();
    return (
<div className="Central_Default w-min font-[outfit] bg-white border-2 border-gray-300 shadow-lg rounded-lg p-8 " style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
    }} >            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <form className="flex flex-col space-y-4">
                <input type="email" ref={email} placeholder="Email" className="p-2 border rounded" />
                <input type="password" ref={password} placeholder="Password" className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => {console.log(email.current.value, password.current.value)}}
                >Login</button>
            </form>
            <div>Don't have an account ? <div onClick={()=>{navigate("/signup")}} className="underline">sign up</div></div>
        </div>
    );
}