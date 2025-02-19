import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/components/header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-8 border w-[400px] shadow-lg rounded-md bg-white">
        <Header name="Add New Product" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 mt-5"
        >
          {/* PRODUCT NAME */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName" className={labelCssStyles}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              className={inputCssStyles}
              required
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productPrice" className={labelCssStyles}>
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={formData.price}
              className={inputCssStyles}
              required
            />
          </div>
          {/* STOCK QUANTITY */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="stockQuantity" className={labelCssStyles}>
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              onChange={handleChange}
              value={formData.stockQuantity}
              className={inputCssStyles}
              required
            />
          </div>

          {/* RATING */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="rating" className={labelCssStyles}>
              Rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              onChange={handleChange}
              value={formData.rating}
              className={inputCssStyles}
              required
            />
          </div>

          {/* CREATE ACTIONS */}
          <div className=" flex gap-5 w-full justify-center items-center mt-5 ">
            <button
              onClick={onClose}
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm w-full hover:bg-gray-700 h-10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-sm w-full hover:bg-blue-700 h-10"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
