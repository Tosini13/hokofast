import { useEffect, useState } from "react";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";
import useAsync from "../../utils/useAsync";

import { getAllItems } from "./actions";
import { useItemsSocket } from "./useItemsSocket";

export const useItemsService = (workspaceId: Id, categoryId?: Id) => {
  const [items, setItems] = useState<TItem[]>();
  const { execute, isProcessing } = useAsync();

  useItemsSocket(setItems, {
    workspacesId: [workspaceId],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await execute(getAllItems({ workspaceId, categoryId }));
      setItems(res);
    };

    fetchData();
  }, [categoryId, workspaceId, execute]);

  return { items, isProcessing };
};

export const useAllItemsService = (workspacesId: Id[], categoryId?: Id) => {
  const [items, setItems] = useState<TItem[]>();
  const { execute, isProcessing } = useAsync();

  useItemsSocket(setItems, {
    workspacesId,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await execute(getAllItems({ categoryId }));
      setItems(res);
    };

    fetchData();
  }, [categoryId, execute, workspacesId]);

  return { items, isProcessing };
};
