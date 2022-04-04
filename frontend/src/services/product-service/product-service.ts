import socketIOClient from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { TProductFormData } from "../../components/Products/ProductForm";
import axios from "axios";
import { EEvents } from "../../types/backend/events";
import { TItem } from "../../types/items";
import { ITEMS_API_URL, SERVER_URL } from "../../models/api";

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
      await axios.post(ITEMS_API_URL(listId), data);
    },
    []
  );

  const getProducts = useCallback(async (listId: string) => {
    const res = await axios.get<TItem[]>(ITEMS_API_URL(listId));
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
