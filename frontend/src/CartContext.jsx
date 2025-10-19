/* eslint-disable no-unused-vars */
import { createContext, useEffect, useRef, } from "react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {loadStripe} from "@stripe/stripe-js"
import cookies from "js-cookie";

export const   CartContext = createContext(null);
const LinkBasis='http://13.234.231.241:8000';




export const CartProvider = ({ children }) => {
    const [userID,setUserID]=useState("");
    const [accessToken,setaccessToken]=useState("");
    const token_type="bearer";
    const [ver,setver]=useState(true);
    const [alert,setAlert]=useState(true);
    const [quan,setQuan]=useState(0);
    const alertMessage=useRef("");

    function LoadUP(){
            const token=cookies.get("accessToken");
        if(token){
            setaccessToken(token);
        }else{
            setver(false);
        }
    }

    useEffect(()=>{
       LoadUP();
    },[])

    function Alert(alertMess){
        alertMessage.current=alertMess;
        setAlert(prev=>!prev);
        setTimeout(() => {
            setAlert(prev => !prev);
        }, 1000);
    }

    const SignUpFunc=(name,email,password)=>{
        const user_type=location.pathname.substring(1)==="admin"?"admin":"user";
        axios.post(`${LinkBasis}/user/signUp`,
            {
                        email,
                        password,
                        name,
                        user_type
        }
        ).then((response)=>{console.log(response.data);setUserID(response.data.id);setver(!ver)}).catch(()=>{Alert("Something went wrong")});
    }

    const LoginFunc=(username,password)=>{
        const newForm=new URLSearchParams();
        newForm.append("username",username);
        newForm.append("password",password);
        newForm.append("grant_type","password");
        axios.post(`http://13.234.231.241:8000/user/login`,newForm,{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
        ).then((response)=>{console.log(response.data);cookies.set("accessToken",response.data.access_token); setaccessToken(response.data.access_token);setver(!ver)}).catch(()=>{Alert("Something went wrong");});
    }


    const [total, setTotal] = useState(0);
    const [adminList,setList]=useState([]);

    const [options,setOptions]=useState([

     // {
     //    name: "burger",
     //    FirstPic: `https://foodish-api.com/images/burger/burger1.jpg`
     // },
     // {
     //    name: "butter-chicken",
     //    FirstPic: `https://foodish-api.com/images/butter-chicken/butter-chicken1.jpg`
     // },
     // {
     //    name: "dessert",
     //    FirstPic: `https://foodish-api.com/images/dessert/dessert1.jpg`
     // },
     // {
     //    name: "dosa",
     //    FirstPic: `https://foodish-api.com/images/dosa/dosa1.jpg`
     // },
     // {
     //    name: "idly",
     //    FirstPic: `https://foodish-api.com/images/idly/idly1.jpg`
     // },
     // {
     //    name: "pasta",
     //    FirstPic: `https://foodish-api.com/images/pasta/pasta1.jpg`
     // },
     // {
     //    name: "pizza",
     //    FirstPic: `https://foodish-api.com/images/pizza/pizza1.jpg`
     // },
     // {
     //    name: "rice",
     //    FirstPic: `https://foodish-api.com/images/rice/rice1.jpg`
     // },
     // {
     //    name: "samosa",
     //    FirstPic: `https://foodish-api.com/images/samosa/samosa1.jpg`
     // },
    ])

    useEffect( ()=>{
        if(accessToken && token_type){
            axios.get(`	http://13.234.231.241:8000/category/viewAllCategories`,{
                headers: {
                    Authorization: `${token_type} ${accessToken}`,
                    Accept: "application/json"
                }
            })
                .then((response) => {
                    setOptions([{
                        id:"0",
                        category_name: "Top Rated",
                        image_url: `https://cdn-icons-png.flaticon.com/512/1486/1486474.png`
                    },... response.data]);
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                });
        }
    },[accessToken])

    const addOptions=(item)=>{
    setOptions([...options,item])
}

    const [cart, setCart] = useState({});
    

    const activeCart=()=>{
        axios.get(`http://13.234.231.241:8000/cart/viewCart`,{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }).then((response)=>{console.log("Cart",response.data);
            setUserID(response.data.user_id);setCart(response.data)}).catch((err)=> {
            Alert("Can't View");
        });
    }




    const addToCart = (id) => {
        axios.post(`http://13.234.231.241:8000/cart/addToCart/${id}`,{},{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }).then(()=>{setMenu(prev=>prev.map((item)=>{if(item.item_id==id){
            return {...item,product_count:item.product_count+1}}
            else{
                return item;
            }
        }));setQuan(prev=>prev+1);}).catch((err)=> {
            Alert("Can't Add");
        });

}

    const removeFromCart = (id) => {
        
        axios.delete(`http://13.234.231.241:8000/cart/removeItemFromCart/${id}`,{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }).then(()=>{setMenu(prev=>prev.map((item)=>{if(item.item_id==id){
            return {...item,quantity:item.product_count>0?item.product_count-1:0}}
            else{
                return item
            }
        }));setQuan(prev=>prev-1)}).catch((err)=> {
            Alert("Can't Remove");
        })
    }


    const RemoveAt= (id) => {
      axios.delete(`http://13.234.231.241:8000/cart/removeItemsFromCart/${id}`,{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }).then(()=>{setMenu(prev=>prev.map((item)=>{if(item.id==id){
            return {...item,product_count:0}}
            else{
                return item;
            }
        }));activeCart()}).catch((err)=> {
            Alert("Can't Remove Entirely");
        })
    }
    // const PresentInCart=(id)=>{
    //     const index=cart.findIndex((i) => i.id === id);
    //     return index==-1?0:cart[index].quantity;
    // }http://13.234.231.241:8000/cart/removeItemsFromCart/682f935ceeecdd503e3d7814

const RemoveItem=(item_id)=>{
        setMenu(FoodList.filter((item)=>{return item.id!==item_id}))
        axios.delete(`http://13.234.231.241:8000/item/deleteItem/${item_id}`,{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        })
}

//List of Orders is here with syntax
const [Orders,SetOrders]=useState([]);

    const LoadOrders=async () => {
        console.log("Orders Loading:",accessToken)
        if(accessToken && token_type){
           await axios.get(`http://13.234.231.241:8000/order/viewOrdersByUser`,{
                headers:{
                    Authorization:`${token_type} ${accessToken}`,
                    Accept:"application/json"
                }
            }).then((response)=>{SetOrders(response.data);console.log("Orders Loaded");console.log(Orders)}).catch(()=>{Alert("Couldn't Load Orders")})

        } 
       };

    const LoadOrdersAsAdmin=() => {
        if(accessToken && token_type){
            axios.get(`http://13.234.231.241:8000/order/viewOrdersByAdmin`,{
                headers:{
                    Authorization:`${token_type} ${accessToken}`,
                    Accept:"application/json"
                }
            }).then((response)=>{SetOrders(response.data);console.log("Orders Loaded");console.log(Orders)}).catch(()=>{Alert("Couldn't Load Orders")})

        }
    };

const ClearCart=async ()=>{
    

    setCart([]);
    setTotal(0);

}

const PostAddress=async (address)=>{
    const data=address;
    console.log({address})

    await axios.post("http://13.234.231.241:8000/deliveryInfo/addDeliveryInfo", data,{
            headers:{
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
    }).then((response)=>{setUserID(response.data.user_id);console.log("Address Posted Online")}).catch((err)=>{console.log(err);Alert("Couldn't Post Address")})
}

const placeOrder=async ()=>{

    axios.post("http://13.234.231.241:8000/order/addOrder",{},{
            headers:{
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }).then((response)=>{console.log(response.data.message);setQuan(0)}).catch(()=>{Alert("Couldn't Place Order")})

}

const ChangeStatus=(status,order_id)=>{
    axios.put(`http://13.234.231.241:8000/order/updateStatus/${order_id}`,{},{
        params:{
            status:status
        },
        headers:{
            Authorization: `${token_type} ${accessToken}`,
            Accept: "application/json"
        },
    }).then(()=>{Alert("Status Updated")}).catch(()=>{Alert("Status can't update")})
}


//List of All Items is here....
const [FoodList,setMenu]=useState([]);

useEffect(() => {
    if (accessToken && token_type) {
        console.log("Fetching items with token:", { accessToken, token_type });

        axios.get(`	http://13.234.231.241:8000/item/viewAllItems`, {
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        })
        .then((response) => {
            console.log("Data:", response.data);
            setMenu(response.data);
        })
        .catch((error) => {
            console.error("Error fetching items:", error);
        });
    }
}, [accessToken, token_type]);

const addItem=async (item,category_nameD)=>{
    let category_id="";
    console.log({
        Authorization: `${token_type} ${accessToken}`,
        Accept: "application/json"
    })
    if(item.category_id==="others"){
        await axios.post("http://13.234.231.241:8000/category/createCategory",{
            category_name:category_nameD,
            category_description:item.item_description,
            image_url:item.image_url,
        },{
            headers: {
                Authorization: `${token_type} ${accessToken}`,
                Accept: "application/json"
            }
        }
    ).then((response)=>{category_id=response.data.id})
    }else{
        category_id=(options.find((item1)=>item1.category_name===item.category_id)).id;
    }
    console.log("Data For adding:",item,category_id);
    await axios.post(`http://13.234.231.241:8000/item/addItem`,{
        item_name: item.item_name,
        rating: item.rating,
        cost: item.cost,
        category_id: category_id,
        item_description: item.item_description,
        image_url: item.image_url,
        user_id:userID,
    }, {
        headers: {
            Authorization: `${token_type} ${accessToken}`,
            Accept: "application/json"
        }
    })
}

const LogOutFunc=()=>{
    setaccessToken("");
    setver(false);
}



//Category Create,Add,View All
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, RemoveAt,

            total, setTotal,ClearCart,

            Orders,PostAddress,LoadOrders,LoadOrdersAsAdmin,ChangeStatus,


            FoodList,setMenu,RemoveItem,addItem,

            adminList,

            options,addOptions,

            ver,accessToken,

            alert,alertMessage,quan,setQuan,activeCart,

            SignUpFunc,LoginFunc, LogOutFunc ,LoadUP
            
            }}>
            {children}
        </CartContext.Provider>
    );
}

