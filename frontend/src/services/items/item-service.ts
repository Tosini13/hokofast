import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import {
  ITEMS_API_URL,
  ITEM_API_URL,
  SERVER_URL,
} from "../../models/endpoints";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

import socketIOClient from "socket.io-client";
import { EEvents, TEventBody, TEventParams } from "../../types/backend/events";

const getItems = (listId: Id) => () =>
  axios.get<TItem[]>(ITEMS_API_URL(listId)).then((data) => data.data);

export const useItemsService = (listId: Id) => {
  const [items, setItems] = useState<TItem[]>();

  const socket = useMemo(() => socketIOClient(SERVER_URL), []);

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
    socket.on(EEvents.createdItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.listId === listId) {
        setItems((prev) => [...(prev ?? []), data.data]);
      }
    });
  }, [socket, listId]);

  useEffect(() => {
    socket.on(EEvents.updatedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.listId === listId) {
        setItems((prev) =>
          prev?.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    });
  }, [socket, listId]);

  useEffect(() => {
    socket.on(EEvents.deletedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.listId === listId) {
        setItems((prev) => prev?.filter((item) => item.id !== data.data.id));
      }
    });
  }, [socket, listId]);

  return items;
};

export const createItem = async (
  listId: string,
  data: Omit<TItem, "id" | "list" | "taken">
) => await axios.post(ITEMS_API_URL(listId), data);

export const editItem = async (
  listId: string,
  itemId: Id,
  data: Omit<TItem, "id" | "list">
) => await axios.put(ITEM_API_URL(listId, itemId), data);

export const deleteItem = async (listId: string, itemId: Id) => {
  await axios.delete(ITEM_API_URL(listId, itemId));
};
