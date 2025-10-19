"use client"
import { useRouter } from "next/navigation";

interface CartItem {
  item_id: number;
  item_name: string;
  price: number;
  quantity: number;
}

interface AdminCart {
  admin_id: string;
  items: CartItem[];
}

interface OrderedFoodProps {
  adminID: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

interface CartTotalProps {
  total: number;
  adminL: number;
  children: React.ReactNode;
}

export default function OrderPage() {
  const router = useRouter();
  const cart: { admin: AdminCart[] } = {
    admin: [
      {
        admin_id: "Admin1",
        items: [
          { item_id: 1, item_name: "Pizza Margherita", price: 12, quantity: 2 },
          { item_id: 2, item_name: "Veggie Burger", price: 10, quantity: 1 },
        ],
      },
      {
        admin_id: "Admin2",
        items: [{ item_id: 3, item_name: "Pasta Alfredo", price: 15, quantity: 3 }],
      },
    ],
  };

  let total = 0;
  let adminL = 0;

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center">
      <div className="shadow-lg overflow-scroll inline-grid rounded-lg p-4 my-10 ">
        <div className="grid grid-cols-6 font-[outfit] text-center text-lg border-b-2 border-gray-300 py-2">
          <div>Admin</div>
          <div>Title</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
          <div>Remove</div>
        </div>
        {cart.admin.map((item1) => {
          adminL++;
          return item1.items.map((item) => {
            total += item.price * item.quantity;
            return (
              <OrderedFood
                adminID={item1.admin_id}
                key={item.item_id}
                name={item.item_name}
                price={item.price}
                quantity={item.quantity}
                id={item.item_id}
              />
            );
          });
        })}
      </div>

      <CartTotal total={total} adminL={adminL}>
        <button
          className="bg-orange-400 text-white rounded-lg mt-4 active:bg-orange-500"
          onClick={() => router.push("/Checkout")}
        >
          Check Out
        </button>
      </CartTotal>
    </div>
  );
}

function OrderedFood({ adminID, name, price, quantity }: OrderedFoodProps) {
  return (
    <div className="grid grid-cols-6 font-[outfit] text-center text-lg max-md:text-md border-b-2 border-gray-300 py-2">
      <div>{adminID}</div>
      <div>{name}</div>
      <div>{quantity}</div>
      <div>${price}</div>
      <div>${price * quantity}</div>
      <button className="place-self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#EA3323"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </button>
    </div>
  );
}

export function CartTotal({ total, adminL, children }: CartTotalProps) {
  return (
    <div className="inline-flex flex-col w-full max-w-96 h-min font-[outfit] shadow-lg rounded-lg p-4">
      <h1 className="border-b-2 text-xl font-semibold">Cart Total</h1>
      <div className="flex flex-row justify-between w-full text-lg">
        <p>Cost</p>
        <p>${Math.round(total * 100) / 100}</p>
      </div>
      <div className="flex flex-row justify-between w-full text-sm font-extralight">
        <p>Delivery Charges </p>
        <p>${5 * adminL}</p>
      </div>
      <div className="flex flex-row justify-between w-full text-lg font-semibold">
        <p>Total</p>
        <p>${Math.round(total * 100) / 100 + 5 * adminL}</p>
      </div>
      {children}
    </div>
  );
}
