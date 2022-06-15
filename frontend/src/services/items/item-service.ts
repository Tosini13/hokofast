import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import {
  ALL_ITEMS_API_URL,
  ITEMS_API_URL,
  ITEM_API_URL,
  SERVER_URL,
} from "../../models/endpoints";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

import socketIOClient from "socket.io-client";
import { EEvents, TEventBody, TEventParams } from "../../types/backend/events";

type TGetAllItemsProps = {
  workspaceId?: Id;
  categoryId?: Id;
};

const getAllItems =
  ({ workspaceId, categoryId }: TGetAllItemsProps) =>
  () =>
    axios
      .get<TItem[]>(ALL_ITEMS_API_URL({ workspaceId, categoryId }))
      .then((data) => data.data);

type TUseItemsServiceProps = {
  workspaceId?: Id;
  categoryId?: Id;
};

export const useItemsService = ({
  workspaceId,
  categoryId,
}: TUseItemsServiceProps) => {
  const [items, setItems] = useState<TItem[]>();

  const socket = useMemo(() => socketIOClient(SERVER_URL), []);

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("items", {
      queryFn: getAllItems({ workspaceId, categoryId }),
    });
    const observer = new QueryObserver<TItem[]>(queryClient, {
      queryKey: "items",
    });

    observer.subscribe((res) => {
      setItems(res.data);
    });
  }, [workspaceId, categoryId]);

  useEffect(() => {
    socket.on(EEvents.createdItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params.workspaceId === workspaceId) {
        setItems((prev) => [...(prev ?? []), data.data]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on(EEvents.updatedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params.workspaceId === workspaceId) {
        setItems((prev) =>
          prev?.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    });
  }, []);

  useEffect(() => {
    socket.on(EEvents.deletedItem, (data: TEventBody<TItem, TEventParams>) => {
      if (data.params.workspaceId === workspaceId) {
        setItems((prev) => prev?.filter((item) => item.id !== data.data.id));
      }
    });
  }, []);

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
