import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import { ITEMS_API_URL, SERVER_URL } from "../../models/api";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

import socketIOClient from "socket.io-client";
import { EEvents } from "../../types/backend/events";
import { TProductFormData } from "../../components/Products/ProductForm";

const getItems = (listId: Id) => () =>
  axios.get<TItem[]>(ITEMS_API_URL(listId)).then((data) => data.data);

export const useItemsService = (listId: Id) => {
  const [items, setItems] = useState<TItem[]>();

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("items", { queryFn: getItems(listId) });
    const observer = new QueryObserver<TItem[]>(queryClient, {
      queryKey: "items",
    });

    observer.subscribe((res) => {
      setItems(res.data);
    });
  }, [listId]);

  useEffect(() => {
    const socket = socketIOClient(SERVER_URL);
    socket.on(EEvents.createdItem, (data: TItem) => {
      setItems((prev) => [...(prev ?? []), data]);
    });
  }, []);

  return items;
};

export const createProduct = async (listId: string, data: TProductFormData) => {
  await axios.post(ITEMS_API_URL(listId), data);
};
