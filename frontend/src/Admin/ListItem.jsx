import { CartContext } from "../CartContext";
import { useContext } from "react";

function Card_Generate( {name,description, image, value ,id,index}) {
    const {setMenu} = useContext(CartContext);
    return (
        <div className="Central_Default realtive p-3  rounded-lg m-5 shadow-md hover:scale-105 transition-transform duration-300" style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
    }}>
            <img
                className="object-cover w-50 h-50 rounded-lg"
                src={image}
            />
            <div className="Central_Default absolute top-5 right-7 rounded-full opacity-80 hover:opacity-100 bg-white"
                onClick={()=>{setMenu(prev=>prev.filter((item)=>{
                    return item.id!=id
                }))}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
             </div>
            <div className="font-semibold mt-3">{name}</div>
            <div className="text-slate-500 text-sm">{description}</div>
            <div className="text-orange-500">${value}</div>
        </div>
    ); 
}

export function ListItem() {
    const {FoodList,setMenu}=useContext(CartContext);
    return (
        <div className="felx flex-col">
        <div className="text-2xl font-semibold ml-10">Your Products</div>
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
                {
                    FoodList.map((item, index) => {return <Card_Generate
                        name={FoodList[index].name} 
                        image={FoodList[index].image} 
                        value={FoodList[index].price} 
                        description={FoodList[index].description}
                        id={FoodList[index].id}
                        index={index} 
                        key={FoodList[index].id} />; })
                }
            </div>
        </div>
        )
    
}
