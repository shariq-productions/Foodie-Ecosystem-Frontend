import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../CartContext";

const addresses = [
    {
        first_name: "Home",
        last_name: "",
        email_address: "adnan@gmail.com",
        state: "West Bengal",
        zip_code: "700014",
        country: "India",
        phone_number: "9163294332",
        street: "Karaya Street",
        city: "Kolkata"
    },
    {
        first_name: "Office",
        last_name: "",
        email_address: "priya.sharma@example.com",
        state: "Maharashtra",
        zip_code: "400001",
        country: "India",
        phone_number: "9876543210",
        street: "Marine Drive",
        city: "Mumbai"
    },
    {
        first_name: "Parents",
        last_name: "",
        email_address: "rahul.verma@example.com",
        state: "Delhi",
        zip_code: "110001",
        country: "India",
        phone_number: "9123456789",
        street: "Connaught Place",
        city: "New Delhi"
    }
];

export function AddressPage() {
    const [selected, setSelected] = useState(0);
    const [fields, setFields] = useState({ ...addresses[0] });

    useEffect(() => {
        setFields({ ...addresses[selected] });
    }, [selected]);

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1 pt-10">
            <DeliveryDetails fields={fields} handleChange={handleChange} />
            <AddressList
                addresses={addresses}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    );
}

function AddressList({ addresses, selected, setSelected }) {
    return (
        <div className="flex flex-col gap-2 mt-4 overflow-scroll">
            {addresses.map((address, idx) => (
                <label
                    key={idx}
                    className={`flex items-center gap-2 p-3 rounded border border-orange-400 bg-white cursor-pointer
                        ${selected === idx ? "bg-orange-100 text-orange-900 ring-2 ring-orange-200" : ""}`}
                >
                    <input
                        type="radio"
                        name="address"
                        checked={selected === idx}
                        onChange={() => setSelected(idx)}
                        className="checked:border-orange-500 accent-orange-500"
                    />
                    <div>
                        <div className="font-semibold text-orange-700">{address.first_name}</div>
                        <div className="text-xs text-orange-600">{address.street}, {address.city}, {address.state}, {address.zip_code}</div>
                        <div className="text-xs text-orange-600">{address.country} | {address.phone_number}</div>
                        <div className="text-xs text-orange-600">{address.email_address}</div>
                    </div>
                </label>
            ))}
        </div>
    );
}

function DeliveryDetails({ fields, handleChange }) {
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Delivery Information</h1>
            <form className="flex flex-col mt-4">
                <input type="text" name="first_name" value={fields.first_name} onChange={handleChange} placeholder="Address Name" className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" name="email_address" value={fields.email_address} onChange={handleChange} placeholder="Email address" className="border border-gray-300 rounded p-2 m-2" />
                <input type="text" name="street" value={fields.street} onChange={handleChange} placeholder="Street" className="border border-gray-300 rounded p-2 m-2" />
                <div className="grid grid-cols-2">
                    <input type="text" name="city" value={fields.city} onChange={handleChange} placeholder="City" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" name="state" value={fields.state} onChange={handleChange} placeholder="State" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <div className="grid grid-cols-2">
                    <input type="text" name="zip_code" value={fields.zip_code} onChange={handleChange} placeholder="Zip Code" className="border border-gray-300 rounded p-2 m-2" />
                    <input type="text" name="country" value={fields.country} onChange={handleChange} placeholder="Country" className="border border-gray-300 rounded p-2 m-2" />
                </div>
                <input type="text" name="phone_number" value={fields.phone_number} onChange={handleChange} placeholder="Phone Number" className="border border-gray-300 rounded p-2 m-2" />
                
            </form>
        </div>
    );
}
