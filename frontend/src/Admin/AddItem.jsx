import { useContext,useRef, useState } from "react"
import { CartContext } from "../CartContext"



export function AddItem({setter}) {
    const name=useRef();
    const price=useRef();
    const rating=useRef();
    const image=useRef();
    const Description=useRef();
    const {setMenu}=useContext(CartContext);
    const [category,setcategory]=useState("Category")

       let options = [
  "biryani",
  "burger",
  "butter-chicken",
  "dessert", 
  "dosa",
  "idly", 
  "pasta",
  "pizza", 
  "rice",
  "samosa","others"
];
    
    return (
        <div className="flex flex-col ">
            <h1 className="text-3xl font-bold">Product Information</h1>
            <form className="flex flex-col mt-4">
                <div className="grid grid-cols-2">
                <input type="text" placeholder="Name" ref={name} className="border border-gray-300 rounded p-2 m-2" />
                <DropDown title={`${category }`+ <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-360 280-560h400L480-360Z"/></svg> }>
                    {options.map((item,index)=>{console.log(item); return (<button type="button" key={index} onClick={()=>{setcategory(item)}} className="Central_Default m-1 bg-white w-full inset-shadow-slate-500/40 hover:inset-shadow-slate-700/70 inset-shadow-xs ">{item}</button>)})} 
                </DropDown>
                <input type="text" placeholder="Price" ref={price} className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" placeholder="Rating" ref={rating} className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" placeholder="Description" ref={Description} className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" placeholder="Image URL" ref={image} className="border border-gray-300 rounded p-2 m-2" />
                <button type="button" className="border-1 rounded" onClick={()=>{
                    setMenu(prev=>[...prev,{name:name.current.value,ratings:rating.current.value,price:Number(price.current.value),category:category,description:Description.current.value,image:image.current.value,id:prev.length+1}])
                    setter();
                     }}>Add Item</button>
            </form>
        </div>  
    )
    
}


export function DropDown({title,children}) {
    
    return (<div className="dropdown mt-2 w-full">
  <button type="button" className="dropbtn w-full  bg-neutral-100 p-2  rounded flex flex-row items-center justify-center">{title}</button>
  <div className="dropdown-content m-2 mt-0 w-full bg-white rounded p-2 shadow-sm ml-0">
    {children}
  </div>
</div>)
}
