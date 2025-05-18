import React, {useContext, useState ,memo } from "react";
import "../App.css";
import { CartContext } from "../CartContext";

export function Home() {
    console.log("Home Loaded");
    return (
        <>
        <MainFrame/>    
        <Menu/>
        </>
    )
}

export function MainFrame() {
    return (
      <section id="HomeBar" className="Central_Default">
        <div className="relative Central_Default w-full">
          <img
            className="object-cover w-full h-full rounded-2xl"
            src="https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1581442353249-5YKSPLFWQQHQCA055MHY/Restaurant-Food-Pics.png"
            alt="Food"
          />
          <div className="absolute left-10 text-center text-white font-[outfit]">

            <div className="text-2xl ">Order your favourite food at</div>
            <div className="text-4xl font-extrabold">Foodie.</div>
          </div>
        </div>
      </section>
    );
  }

  export function Menu() {
    let options = [
  "Top Rated",
  "biryani",
  "burger",
  "butter-chicken",
  "dessert", 
  "dosa",
  "idly", 
  "pasta",
  "pizza", 
  "rice",
  "samosa"
];
      const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <section id="MenuBar" className="Central_Default">
        <>
        <p className="text-3xl font-semibold m-5 underline">Explore Our Menu</p>
        <p className="text-slate-500">dive into a world of rich flavors and culinary delights. Whether you're craving something spicy like biryani or dosa, or in the mood for comfort food like butter chicken or pasta, there's something here for every taste bud. From quick bites like samosas and burgers to hearty meals like pizza and rice dishes, the variety ensures you'll never run out of delicious options. Don’t forget to satisfy your sweet tooth with a tempting dessert at the end. Each item is crafted to delight, so take your time, explore the menu, and enjoy every bite.</p>
        </>
        <div className="flex p-2 max-w-screen overflow-x-scroll">
            {options.map((item, index) => (
                <div key={index} className="place-self-center flex flex-col items-center rounded-lg m-5 hover:scale-105 transition-transform duration-300 ">
                    <img
                        className={"Circular_Box aspect-square" + (currentIndex==index?" Circular_Box_Outline":"") }
                        src={(index==0)?`https://cdn-icons-png.flaticon.com/512/1486/1486474.png`:`https://foodish-api.com/images/${item}/${item}1.jpg`}
                        onClick={() => {
                            setCurrentIndex(index);
                        }}
                    />
                    <div className="font-semibold">{item}</div>
                </div>
            ))}
        </div>
        <MenuBar key={currentIndex} curr={currentIndex} fdItems={options} />
        </section>
      
    );
  
}

export function AboutUs() {
    return (
        <div className="Central_Default">
            <div className="relative Central_Default w-full">
                <img
                    className="object-cover w-full h-full rounded-2xl"
                    src="https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1581442353249-5YKSPLFWQQHQCA055MHY/Restaurant-Food-Pics.png"
                    alt="Food"
                />
                <div className="absolute left-10 text-center text-white font-[outfit]">
                    <div className="text-2xl ">Order your favourite food at</div>
                    <div className="text-4xl font-extrabold">Foodie.</div>
                </div>
            </div>
        </div>
    );
}

//Create a full array of products and then use the map function to create a card for each product
//The Array must have Category , Name, Image, Price, Description, Rating, Reviews,ID
const MenuBar= memo(
function MenuBar({curr,fdItems}) {
    const {FoodList}=useContext(CartContext);
    if (curr != 0) {
    return (
        <>
        <div  className="text-2xl font-semibold">{fdItems[curr]}</div>
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
                {
                    FoodList.filter((item) => item.category === fdItems[curr]).map((item) => (
                        <Card_Generator
                            key={item.id}
                            name={item.name}
                            image={item.image}
                            value={item.price}
                            description={item.description}
                            ratings={item.ratings}
                            id={item.id}
                        />
                    ))
                }
            </div>
        </>
    );
}
    else {
        return (
        <>
        <div className="text-2xl font-semibold">Top Rated</div>
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
                {
                    FoodList.map((item, index) => {if(item.ratings>4.5) return <Card_Generator 
                        name={item.name} 
                        image={item.image} 
                        value={item.price} 
                        description={item.description}
                        id={item.id}
                        ratings={item.ratings}
                        AdminID={item.AdminID}
                        key={item.id} />; })
                }
            </div>
        </>
        )
    }
});
const Card_Generator= memo(
    function Card_Generator( {name,description, image, value ,id,ratings,AdminID}) {
    const { addToCart ,removeFromCart,PresentInCart} = useContext(CartContext);
    const [quantity, setQuantity] = useState(PresentInCart(id));
    return (
        <div className="Central_Default p-3  rounded-lg m-5 shadow-md hover:scale-105 transition-transform duration-300" style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
    }}>
            <img
                className="object-cover w-50 h-50 rounded-lg"       
                src={image}
            />
            <div className="Central_Default -mt-11">
                <div className="flex justify-between bg-white opacity-75 hover:opacity-100 rounded-full p-1">
                <button onClick={()=>{
                    removeFromCart(id);
                    setQuantity(count=>count>0?count-1:0)
                    }} className="opacity-75 active:opacity-100 mx-1">
                    <svg className=" rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M280-417h400v-126H280v126ZM480-46q-91 0-169.99-34.08-78.98-34.09-137.41-92.52-58.43-58.43-92.52-137.41Q46-389 46-480q0-91 34.08-169.99 34.09-78.98 92.52-137.41 58.43-58.43 137.41-92.52Q389-914 480-914q91 0 169.99 34.08 78.98 34.09 137.41 92.52 58.43 58.43 92.52 137.41Q914-571 914-480q0 91-34.08 169.99-34.09 78.98-92.52 137.41-58.43 58.43-137.41 92.52Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0-308Z"/></svg>
                </button>
                <div className="bg-orange-400 mx-1 text-white rounded-full px-2 text-xl">{quantity}</div>
                <button onClick={()=>{
                    addToCart({id, name, description, image,value,AdminID });
                    setQuantity(count=>count+1);
                    }} 
                    className="opacity-75 active:opacity-100 mx-1">
                    <svg className=" rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M432-272h96v-160h160v-96H528v-160h-96v160H272v96h160v160Zm48 226q-91 0-169.99-34.08-78.98-34.09-137.41-92.52-58.43-58.43-92.52-137.41Q46-389 46-480q0-91 34.08-169.99 34.09-78.98 92.52-137.41 58.43-58.43 137.41-92.52Q389-914 480-914q91 0 169.99 34.08 78.98 34.09 137.41 92.52 58.43 58.43 92.52 137.41Q914-571 914-480q0 91-34.08 169.99-34.09 78.98-92.52 137.41-58.43 58.43-137.41 92.52Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0-308Z"/></svg>
                </button>
                    </div>
             </div>
            <div className="font-semibold mt-3">{name}</div>
            <div className="text-slate-500 text-sm">{description}</div>
            <div className="text-orange-500">${value}</div>
            <div className="flex -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EAC452"><path d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"/></svg>
            <p className="text-yellow-400">{ratings}</p>
            </div>
        </div>
    ); 
}
);