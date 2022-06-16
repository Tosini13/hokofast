import axios from "axios";
import {
  ALL_ITEMS_API_URL,
  ITEMS_API_URL,
  ITEM_API_URL,
} from "../../models/endpoints";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

type TGetAllItemsProps = {
  workspaceId?: Id;
  categoryId?: Id;
};

export const getAllItems = ({ workspaceId, categoryId }: TGetAllItemsProps) =>
  axios
    .get<TItem[]>(ALL_ITEMS_API_URL({ workspaceId, categoryId }))
    .then((data) => data.data);

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
