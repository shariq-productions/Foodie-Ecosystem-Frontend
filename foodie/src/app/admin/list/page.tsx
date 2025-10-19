"use client";
import Image from "next/image";
import { FoodList } from "../../../../public/MenuList";
interface ItemA {
  id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    ratings: string;
    image: string;
    admin_id:number;
}

function Card_Generate({ item, onRemove }: { item: ItemA; onRemove: (id: number) => void }) {
  return (
    <div
      className="Central_Default relative p-3 rounded-lg m-5 shadow-md hover:scale-105 transition-transform duration-300"
      style={{
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out forwards",
      }}
    >
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div
        className="Central_Default absolute top-5 right-7 rounded-full opacity-80 hover:opacity-100 bg-white cursor-pointer"
        onClick={() => onRemove(item.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#EA3323"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </div>

      <div className="font-semibold mt-3">{item.name}</div>
      <div className="text-slate-500 text-sm">{item.description}</div>
      <div className="text-orange-500 font-medium">${item.price}</div>
    </div>
  );
}

export default function ListItem() {
  
  const sampleItems: ItemA[] = FoodList
  .filter((_, index) => !(index % 5)) // keep only items not divisible by 5
  .map((item, index) => ({
    ...item,
    admin_id: index,
  }));

  const handleRemove = (id: number) => {
    console.log(`Removed item with ID: ${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-semibold ml-10 mt-4">Your Products</div>
      <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {sampleItems.map((item) => (
          <Card_Generate key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}
