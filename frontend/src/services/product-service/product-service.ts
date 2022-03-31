import socketIOClient from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { TProductFormData } from "../../components/Products/ProductForm";
import { TProduct } from "../../types/products";
import { mockProducts } from "./mockData";
import axios from "axios";
import { EEvents } from "../../types/backend/events";

// ======================== URL ===========================
const SERVER_URL = "http://127.0.0.1:3001"; //process.env.REACT_APP_SERVER_URL ?? "";
const PRODUCTS_API_URL = "items";

export const useProductService = () => {
  const [products, setProducts] = useState<TProduct[]>(mockProducts);

  useEffect(() => {
    const socket = socketIOClient(SERVER_URL);
    socket.on(EEvents.getCreatedItem, (data) => {
      setProducts((prev) => [
        ...prev,
        { name: data.name, id: prev.length.toString() },
      ]);
    });
  }, []);

  const createProduct = useCallback(async (data: TProductFormData) => {
    await axios.post(`${SERVER_URL}/api/${PRODUCTS_API_URL}`, data);
  }, []);

  return {
    products,
    createProduct,
  };
};
