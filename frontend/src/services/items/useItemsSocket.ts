import { useCallback, useEffect, useMemo } from "react";
import { SERVER_URL } from "../../models/endpoints";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

import socketIOClient from "socket.io-client";
import { EEvents, TEventBody, TEventParams } from "../../types/backend/events";

type TDependencies = {
  workspacesId: Id[];
};

export const useItemsSocket = (
  setItems: React.Dispatch<React.SetStateAction<TItem[] | undefined>>,
  { workspacesId }: TDependencies
) => {
  const socket = useMemo(() => socketIOClient(SERVER_URL), []);

  const filterData = useCallback(
    (action: (data: TEventBody<TItem, TEventParams>) => void) =>
      (data: TEventBody<TItem, TEventParams>) => {
        if (workspacesId.includes(data.params.workspaceId)) {
          action(data);
        }
      },
    [workspacesId]
  );

  const handleCreateItem = useCallback(
    (data: TEventBody<TItem, TEventParams>) =>
      setItems((prev) => [...(prev ?? []), data.data]),
    [setItems]
  );

  const handleUpdateItem = useCallback(
    (data: TEventBody<TItem, TEventParams>) =>
      setItems((prev) =>
        prev?.map((item) => (item.id === data.data.id ? data.data : item))
      ),
    [setItems]
  );

  const handleDeleteItem = useCallback(
    (data: TEventBody<TItem, TEventParams>) =>
      setItems((prev) => prev?.filter((item) => item.id !== data.data.id)),
    [setItems]
  );

  useEffect(() => {
    socket.on(EEvents.createdItem, filterData(handleCreateItem));

    return () => {
      socket.off(EEvents.createdItem);
    };
  }, [filterData]);

  useEffect(() => {
    socket.on(EEvents.updatedItem, filterData(handleUpdateItem));

    return () => {
      socket.off(EEvents.updatedItem);
    };
  }, [filterData]);

  useEffect(() => {
    socket.on(EEvents.deletedItem, filterData(handleDeleteItem));

    return () => {
      socket.off(EEvents.deletedItem);
    };
  }, [filterData]);
};
