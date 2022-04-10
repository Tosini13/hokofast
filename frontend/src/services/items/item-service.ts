import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import { ITEMS_API_URL, ITEM_API_URL, SERVER_URL } from "../../models/api";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

import socketIOClient from "socket.io-client";
import { EEvents } from "../../types/backend/events";
import { mockItems } from "./mock";

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
    socket.on(EEvents.createdItem, (data: TItem) => {
      setItems((prev) => [...(prev ?? []), data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on(EEvents.updatedItem, (data: TItem) => {
      setItems((prev) =>
        prev?.map((item) => (item.id === data.id ? data : item))
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on(EEvents.deletedItem, (data: TItem) => {
      setItems((prev) => prev?.filter((item) => item.id !== data.id));
    });
  }, [socket]);

  /**
   * @todo
   * remove mock
   */
  return items?.length ? items : mockItems.filter((i) => i.list === listId);
};

export const createItem = async (
  listId: string,
  data: Omit<TItem, "id" | "list">
) => {
  await axios.post(ITEMS_API_URL(listId), data);
};

export const editItem = async (
  listId: string,
  itemId: Id,
  data: Omit<TItem, "id" | "list">
) => {
  await axios.put(ITEM_API_URL(listId, itemId), data);
};

export const deleteItem = async (listId: string, itemId: Id) => {
  await axios.delete(ITEM_API_URL(listId, itemId));
};
