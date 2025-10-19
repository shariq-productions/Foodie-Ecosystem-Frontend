"use client";
import { useRef, useState } from "react";

interface Option {
  id: string;
  category_name: string;
}

interface Item {
  item_name: string;
  rating: string;
  cost: number;
  category_id: string;
  item_description: string;
  image_url: string;
}

interface AddItemProps {
  setter: () => void;
  options: Option[];
  addItem: (item: Item, newCategory?: string) => void;
}

//Add options via api....

export default function AddItem({ setter, addItem }: AddItemProps) {
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const rating = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const newCategory = useRef<HTMLInputElement>(null);
  const options=[{ category_name: "Mughlai", id: 1 },{ category_name: "Biryani", id: 2 },{ category_name: "Burger", id: 3 }];
  const newOptions = [{ category_name: "others", id: 0 }, ...options];
  const [category, setCategory] = useState("others");

  const handleAddItem = () => {
    const objectItem: Item = {
      item_name: name.current?.value || "",
      rating: rating.current?.value || "",
      cost: Number(price.current?.value) || 0,
      category_id: category,
      item_description: description.current?.value || "",
      image_url: image.current?.value || "",
    };

    addItem(objectItem, newCategory.current?.value || "");
    setter();
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-3xl font-bold">Product Information</h1>
      <form className="flex flex-col mt-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            ref={name}
            className="border border-gray-300 rounded p-2 m-2"
          />

          <select
            name="category"
            value={category}
            className="dropdown mt-2 w-full h-fit p-2 bg-gray-100 border border-gray-300 rounded-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            {newOptions.map((item) => (
              <option value={item.category_name} key={item.id}>
                {item.category_name}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Price"
            ref={price}
            className="border border-gray-300 rounded p-2 m-2"
          />
          <input
            type="text"
            placeholder="Rating"
            ref={rating}
            className="border border-gray-300 rounded p-2 m-2"
          />
        </div>

        <input
          type="text"
          placeholder="Description"
          ref={description}
          className="border border-gray-300 rounded p-2 m-2"
        />

        <input
          type="text"
          placeholder="New Category"
          ref={newCategory}
          className={`border border-gray-300 rounded p-2 m-2 ${
            category === "others" ? "" : "hidden"
          }`}
        />
       <div className="m-2">
  <label className="flex items-center justify-center cursor-pointer bg-orange-400 hover:bg-orange-500 text-white rounded-lg py-2 px-4 shadow transition">
    Upload Image
    <input
      type="file"
      ref={image}
      className="hidden"
    />
  </label>

  </div>
        <button
          type="button"
          className="border rounded bg-amber-500 text-white p-2 mt-2"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
