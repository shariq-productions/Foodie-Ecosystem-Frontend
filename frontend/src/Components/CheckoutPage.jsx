import { CartTotal } from "./OrderPage";
import { useContext, useRef } from "react";
import { CartContext } from "../CartContext";
import {useNavigate} from "react-router";


export function CheckoutPage() {
    const { total,cart } = useContext(CartContext);
    let adminL=0;
    if (cart.admin) {
        cart.admin.map(() => {adminL++})
    }
    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1  pt-10">
            <DeliveryDetails/>
            <CartTotal  total={total} adminL={adminL} Button={() => {
                return (
                        <></>
                        )
            }} />
        </div>
    )
}
function OrderDone({ refs }) {
    const { PostAddress } = useContext(CartContext);
    const router=useRouter();


    return (
        <button
            type="button"
            className="bg-blue-500 text-white rounded-lg p-2"
            onClick={() => {
                const deliveryInfo = {
                    first_name: refs.Fname.current?.value || "",
                    last_name: refs.Lname.current?.value || "",
                    email_address: refs.Mail.current?.value || "",
                    state: refs.State.current?.value || "",
                    zip_code: refs.ZCode.current?.value || "",
                    country: refs.Country.current?.value || "",
                    phone_number: refs.PhoneNo.current?.value || "",
                    street: refs.Street.current?.value || "",
                    city: refs.City.current?.value || "",
                };
                PostAddress(deliveryInfo).then(()=>{router.push("/pay")});
            }}
        >
            Submit
        </button>
    );
}

function DeliveryDetails() {
    const refs = {
        Fname: useRef(),
        Lname: useRef(),
        Mail: useRef(),
        Street: useRef(),
        City: useRef(),
        State: useRef(),
        ZCode: useRef(),
        Country: useRef(),
        PhoneNo: useRef(),
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Delivery Information</h1>
            <form className="flex flex-col mt-4">
                <div className="grid grid-cols-2">
                    <input type="text" ref={refs.Fname} value="Adnan" placeholder="First Name" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={refs.Lname} value="Aftab" placeholder="Last Name" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" ref={refs.Mail} value="adnan@gmail.com" placeholder="Email address" className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" ref={refs.Street} value="Karaya Street" placeholder="Street" className="border border-gray-300 rounded p-2 m-2" />
                <div className="grid grid-cols-2">
                    <input type="text" ref={refs.City} value="Kolkata" placeholder="City" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={refs.State} value="West Bengal" placeholder="State" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <div className="grid grid-cols-2">
                    <input type="text" ref={refs.ZCode} value="700014" placeholder="Zip Code" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" ref={refs.Country} value="India" placeholder="Country" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" ref={refs.PhoneNo} value="9163294332" placeholder="Phone Number" className="border border-gray-300 rounded p-2 m-2" />
                <OrderDone refs={refs} />
            </form>
        </div>
    );
}
