"use client";

import React, { useState, useEffect } from "react";

type Item = {
  item_name: string;
  quantity: number;
  price: number;
  total_amount: number;
};

type Order = {
  id: number;
  time_of_order: string;
  status: string;
  items: Item[];
};

export default function TrackOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate fetching orders from API
    const sampleOrders: Order[] = [
      {
        id: 101,
        time_of_order: "2025-10-03 15:45",
        status: "Pending",
        items: [
          { item_name: "Chicken Burger", quantity: 2, price: 120, total_amount: 240 },
          { item_name: "French Fries", quantity: 1, price: 80, total_amount: 80 },
        ],
      },
      {
        id: 102,
        time_of_order: "2025-10-02 18:22",
        status: "Delivered",
        items: [
          { item_name: "Pizza", quantity: 1, price: 300, total_amount: 300 },
          { item_name: "Coke", quantity: 2, price: 60, total_amount: 120 },
        ],
      },
    ];

    // Mock API delay
    setTimeout(() => {
      setOrders(sampleOrders);
    }, 500);
  }, []);

  const changeStatus = (newStatus: string, orderId: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <div className="w-full p-4">
      <div className="font-[outfit] w-full text-center text-3xl font-semibold m-3 underline">
        My Orders
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 italic">Loading orders...</div>
      ) : (
        orders.map((order) => (
          <OrderPlaced key={order.id} order={order} changeStatus={changeStatus} />
        ))
      )}
    </div>
  );
}

function OrderPlaced({
  order,
  changeStatus,
}: {
  order: Order;
  changeStatus: (newStatus: string, orderId: number) => void;
}) {
  const total = order.items.reduce((sum, item) => sum + item.total_amount, 0);

  return (
    <div className="w-full m-2 mt-4 p-4 text-slate-600 italic bg-white rounded-lg shadow-md shadow-black/20">
      <div className="font-semibold">Order ID: {order.id}</div>
      <div>Time of Order: {order.time_of_order}</div>
      <br />
      <div className="flex items-center gap-2">
        Status:
        <select
          className="mx-2 border rounded-md p-1 text-slate-800"
          value={order.status}
          onChange={(e) => changeStatus(e.target.value, order.id)}
        >
          <option value="Pending">Pending</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="text-slate-900 text-xl underline w-full text-center mt-4 mb-2">
        Items
      </div>

      <div className="ml-4 grid grid-cols-4  gap-y-1 text-sm sm:text-base">
        <p className="underline font-bold">Name</p>
        <p className="underline font-bold">Quantity</p>
        <p className="underline font-bold">Price</p>
        <p className="underline font-bold">Total Cost</p>

        {order.items.map((item, i) => (
          <React.Fragment key={i}>
            <p>{item.item_name}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <p>{item.total_amount}</p>
          </React.Fragment>
        ))}

        <div className="col-span-4 border-b my-2" />

        <p></p>
        <p></p>
        <p className="text-lg font-bold">Total:</p>
        <p className="text-lg font-bold">{total}</p>
      </div>
    </div>
  );
}
