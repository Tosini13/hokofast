export enum EEvents {
  createdItem = "CREATED_ITEM",
  updatedItem = "UPDATED_ITEM",
  deletedItem = "DELETED_ITEM",
  createdList = "CREATED_LIST",
  updatedList = "UPDATED_LIST",
  deletedList = "DELETED_LIST",
}

export type TEventBody<TData, TParams = void> = {
  data: TData;
  params?: TParams;
};

export type TEventParams = {
  workspaceId: string;
  categoryId?: string;
};
