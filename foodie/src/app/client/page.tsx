"use client"
import {useState} from "react";
import Image from "next/image";
import { FoodList } from "../../../public/MenuList";

export default function Home() {
  
    return (
        <>
        <MainFrame/>    
        <Menu/>
        </>
    )
}

export function MainFrame() {
    return (
      <section id="HomeBar" className="Central_Default m-5">
        <div className="relative Central_Default w-full h-[60vh] rounded-2xl overflow-hidden">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1581442353249-5YKSPLFWQQHQCA055MHY/Restaurant-Food-Pics.png"
            alt="Food"
            fill
            style={{ objectFit: "fill" }}
            unoptimized
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
    const foodMenu = {
  top:{
    name:"Top rated",
    image:"https://img.freepik.com/free-vector/award-ribbon-check-mark-with-stars-gradient-style_78370-1098.jpg?semt=ais_hybrid&w=740&q=80"
  },
  biryani: {
    name: "Biryani",
    image: "https://foodish-api.com/images/biryani/biryani65.jpg"
  },
  burger: {
    name: "Burger",
    image: "https://foodish-api.com/images/burger/burger25.jpg"
  },
  butterChicken: {
    name: "Butter-Chicken",
    image: "https://foodish-api.com/images/butter-chicken/butter-chicken14.jpg"
  },
  dessert: {
    name: "Dessert",
    image: "https://foodish-api.com/images/dessert/dessert33.jpg"
  },
  dosa: {
    name: "Dosa",
    image: "https://foodish-api.com/images/dosa/dosa32.jpg"
  },
  idly: {
    name: "Idly",
    image: "https://foodish-api.com/images/idly/idly15.jpg"
  },
  pasta: {
    name: "Pasta",
    image: "https://foodish-api.com/images/pasta/pasta23.jpg"
  },
  pizza: {
    name: "Pizza",
    image: "https://foodish-api.com/images/pizza/pizza28.jpg"
  },
  rice: {
    name: "Rice",
    image: "https://foodish-api.com/images/rice/rice13.jpg"
  },
  samosa: {
    name: "Samosa",
    image: "https://foodish-api.com/images/samosa/samosa8.jpg"
  }
};


    const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
        <section id="MenuBar" className="Central_Default">
        <>
        <p className="text-3xl font-semibold m-5 underline">Explore Our Menu</p>
    <p className="text-slate-500 px-5">Dive into a world of rich flavors and culinary delights. Whether you&apos;re craving something spicy like biryani or dosa, or in the mood for comfort food like butter chicken or pasta, there&apos;
      s something here for every taste bud. From quick bites like samosas and burgers to hearty meals like pizza and rice dishes, the variety ensures you won&apos;t run out of delicious options. Don&apos;
      t forget to satisfy your sweet tooth with a tempting dessert at the end. Each item is crafted to delight, so take your time, explore the menu, and enjoy every bite.</p>
        </>
        <div className="flex p-2 max-w-screen overflow-x-scroll">
      {Object.values(foodMenu).map((item, index) => (
        <div key={index} className="place-self-center flex flex-col items-center rounded-lg m-5 hover:scale-105 transition-transform duration-300 overflow-clip">
          <div className={"Circular_Box m-2  overflow-clip" + (currentIndex==index?" Circular_Box_Outline":"") } style={{position:'relative', width:120, height:120}} onClick={() => setCurrentIndex(index)}>
            <Image src={item.image} alt={item.name} fill style={{objectFit:'cover'}} unoptimized />
          </div>
          <div className="font-semibold">{item.name}</div>
        </div>
      ))}
        </div>
    {/* pass fdItems as array of categories */}
    <MenuBar key={currentIndex} curr={currentIndex} fdItems={Object.values(foodMenu).map((it, idx)=>({id: idx, category_name: it.name, image_url: it.image}))} />
        </section>
      
    );
  
}



//Create a full array of products and then use the map function to create a card for each product
//The Array must have Category , Name, Image, Price, Description, Rating, Reviews,ID
function MenuBar({curr,fdItems}: { curr: number; fdItems: { id:number; category_name:string; image_url:string }[] }) {

    if (curr != 0) {
    return (
        <>
    <div  className="text-2xl font-semibold">{fdItems[curr]?.category_name}</div>
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
                {
          FoodList.map((item) => {
              if ((item.category || '').toString().toLowerCase() === (fdItems[curr]?.category_name || '').toString().toLowerCase()) {
                                return (<Card_Generator
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                    description={item.description}
                                    category={item.category}
                                    id={item.id}
                                    ratings={item.ratings}
                                    key={item.id}
                                />)
                            }
                        }
                    )
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
                    FoodList.map((item) => {if(Number(item.ratings)>4) return <Card_Generator
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                    description={item.description}
                                    category={item.category}
                                    id={item.id}
                                    ratings={item.ratings}
                                    key={item.id}
                                />; })
                }
            </div>
        </>
        )
    }
}
interface Items {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: string;
  ratings: string;
  image: string;
}

function Card_Generator( {name,description, image, price ,ratings}:Items) {
    return (
        <div className="Central_Default p-3  rounded-lg m-5 shadow-md hover:scale-105 transition-transform duration-300" style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
    }}>
      <div style={{position:'relative', width:'100%', height:180}}>
        <Image src={image} alt={name} fill style={{objectFit:'cover'}} unoptimized loading="lazy" className="rounded-lg" />
      </div>
            <div className="Central_Default -mt-11">
                <div className="flex justify-between bg-white opacity-75 hover:opacity-100 rounded-full p-1">
                <button onClick={()=>{
                    // removeFromCart(id);
                    // setQuantity(count=>count>0?count-1:0)
                    }} className="opacity-75 active:opacity-100 mx-1">
                    <svg className=" rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M280-417h400v-126H280v126ZM480-46q-91 0-169.99-34.08-78.98-34.09-137.41-92.52-58.43-58.43-92.52-137.41Q46-389 46-480q0-91 34.08-169.99 34.09-78.98 92.52-137.41 58.43-58.43 137.41-92.52Q389-914 480-914q91 0 169.99 34.08 78.98 34.09 137.41 92.52 58.43 58.43 92.52 137.41Q914-571 914-480q0 91-34.08 169.99-34.09 78.98-92.52 137.41-58.43 58.43-137.41 92.52Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0-308Z"/></svg>
                </button>
                <div className="bg-orange-400 mx-1 text-white rounded-full px-2 text-xl">{0}</div>
                <button onClick={()=>{
                    // addToCart(id);
                    // setQuantity(count=>count+1);
                    }} 
                    className="opacity-75 active:opacity-100 mx-1">
                    <svg className=" rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M432-272h96v-160h160v-96H528v-160h-96v160H272v96h160v160Zm48 226q-91 0-169.99-34.08-78.98-34.09-137.41-92.52-58.43-58.43-92.52-137.41Q46-389 46-480q0-91 34.08-169.99 34.09-78.98 92.52-137.41 58.43-58.43 137.41-92.52Q389-914 480-914q91 0 169.99 34.08 78.98 34.09 137.41 92.52 58.43 58.43 92.52 137.41Q914-571 914-480q0 91-34.08 169.99-34.09 78.98-92.52 137.41-58.43 58.43-137.41 92.52Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0-308Z"/></svg>
                </button>
                    </div>
             </div>
            <div className="font-semibold mt-3">{name}</div>
            <div className="text-slate-500 text-sm">{description}</div>
            <div className="text-orange-500">${price}</div>
            <div className="flex -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EAC452"><path d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"/></svg>
            <p className="text-yellow-400">{ratings}</p>
            </div>
        </div>
    ); 
}