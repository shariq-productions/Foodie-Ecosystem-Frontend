"use client";
import { useEffect, useState } from "react";

interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
  total_amount: number;
}

interface Order {
  id: number;
  time_of_order: string;
  status: string;
  items: OrderItem[];
}

export default function TrackPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const sampleOrders: Order[] = [
      {
        id: 101,
        time_of_order: "2025-10-01 14:30",
        status: "Preparing",
        items: [
          { item_name: "Pizza Margherita", quantity: 2, price: 12, total_amount: 24 },
          { item_name: "Veggie Burger", quantity: 1, price: 10, total_amount: 10 },
        ],
      },
      {
        id: 102,
        time_of_order: "2025-10-02 12:00",
        status: "Delivered",
        items: [
          { item_name: "Pasta Alfredo", quantity: 3, price: 15, total_amount: 45 },
        ],
      },
    ];
    setOrders(sampleOrders);
  }, []);

  return (
    <>
      {orders.map((order) => (
        <OrderPlaced key={order.id} order={order} />
      ))}
    </>
  );
}

function OrderPlaced({ order }: { order: Order }) {
  const total = order.items.reduce((sum, item) => sum + item.total_amount, 0);

  return (
    <div className="w-full m-2 mt-4 p-2 text-slate-500 italic bg-white rounded-lg shadow-md shadow-black/40">
      <div className="font-semibold">Order ID: {order.id}</div>
      <div>Time of Order: {order.time_of_order}</div>
      <div className="flex">
        Status: <p className="font-bold text-orange-500 ml-1">{order.status}</p>
      </div>
      <div className="text-slate-900 text-xl underline w-full text-center">Items</div>

      <div className="ml-10 mt-2">
        <div className="grid grid-cols-4 justify-between">
          <p className="underline font-bold">Name</p>
          <p className="underline font-bold">Quantity</p>
          <p className="underline font-bold">Price</p>
          <p className="underline font-bold">Total Cost</p>

          {order.items.map((item, index) => (
            <div key={index} className="contents">
              <p>{item.item_name}</p>
              <p>{item.quantity}</p>
              <p>{item.price}</p>
              <p>{item.total_amount}</p>
            </div>
          ))}

          <div className="col-span-4 border-b-2 my-2"></div>

          <p></p>
          <p></p>
          <p className="text-xl font-bold">Total:</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
      </div>
    </div>
  );
}
