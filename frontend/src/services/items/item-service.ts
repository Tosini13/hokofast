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

const getItems = (workspaceId: Id) => () =>
  axios.get<TItem[]>(ITEMS_API_URL(workspaceId)).then((data) => data.data);

export const useItemsService = (workspaceId: Id) => {
  const [items, setItems] = useState<TItem[]>();

  const socket = useMemo(() => socketIOClient(SERVER_URL), []);

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("items", { queryFn: getItems(workspaceId) });
    const observer = new QueryObserver<TItem[]>(queryClient, {
      queryKey: "items",
    });

    observer.subscribe((res) => {
      setItems(res.data);
    });
  }, [workspaceId]);

  useEffect(() => {
    socket.on(EEvents.createdItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.workspaceId === workspaceId) {
        setItems((prev) => [...(prev ?? []), data.data]);
      }
    });
  }, [socket, workspaceId]);

  useEffect(() => {
    socket.on(EEvents.updatedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.workspaceId === workspaceId) {
        setItems((prev) =>
          prev?.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    });
  }, [socket, workspaceId]);

  useEffect(() => {
    socket.on(EEvents.deletedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params?.workspaceId === workspaceId) {
        setItems((prev) => prev?.filter((item) => item.id !== data.data.id));
      }
    });
  }, [socket, workspaceId]);

  return items;
};

export const createItem = async (
  workspaceId: string,
  data: Omit<TItem, "id" | "workspace" | "taken">
) => await axios.post(ITEMS_API_URL(workspaceId), data);

export const editItem = async (
  workspaceId: string,
  itemId: Id,
  data: Omit<TItem, "id" | "workspace">
) => await axios.put(ITEM_API_URL(workspaceId, itemId), data);

export const deleteItem = async (workspaceId: string, itemId: Id) => {
  await axios.delete(ITEM_API_URL(workspaceId, itemId));
};
