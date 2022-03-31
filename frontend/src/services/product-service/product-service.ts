import socketIOClient from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { TProductFormData } from "../../components/Products/ProductForm";
import axios from "axios";
import { EEvents } from "../../types/backend/events";
import { TItem } from "../../types/items";

// ======================== URL ===========================
const SERVER_URL = "http://127.0.0.1:3000"; //process.env.REACT_APP_SERVER_URL ?? "";
const ITEMS_API_URL = (listId: string, itemId?: string) =>
  `/lists/${listId}/items${itemId ? "/" + itemId : ""}`;

export const useProductService = () => {
  const [products, setProducts] = useState<TItem[]>([]);

  useEffect(() => {
    const socket = socketIOClient(SERVER_URL);
    socket.on(EEvents.createdItem, (data: TItem) => {
      setProducts((prev) => [...prev, data]);
    });
  }, []);

  const createProduct = useCallback(
    async (listId: string, data: TProductFormData) => {
      await axios.post(`${SERVER_URL}/api/${ITEMS_API_URL(listId)}`, data);
    },
    []
  );

  const getProducts = useCallback(async (listId: string) => {
    const res = await axios.get<TItem[]>(
      `${SERVER_URL}/api/${ITEMS_API_URL(listId)}`
    );
    console.log("res", res);
    setProducts(res.data);
  }, []);

  useEffect(() => {
    getProducts("6245df58d3657c109b66e668");
  }, [getProducts]);

  return {
    products,
    createProduct,
    getProducts,
  };
};
