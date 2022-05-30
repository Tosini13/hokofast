export enum EEvents {
  createdItem = "CREATED_ITEM",
  updatedItem = "UPDATED_ITEM",
  deletedItem = "DELETED_ITEM",
  createdList = "CREATED_LIST",
  updatedList = "UPDATED_LIST",
  deletedList = "DELETED_LIST",
  createdWorkspace = "CREATED_WORKSPACE",
  updatedWorkspace = "UPDATED_WORKSPACE",
  deletedWorkspace = "DELETED_WORKSPACE",
}

export type TEventBody<TData, TParams = void> = {
  data: TData;
  params?: TParams;
};
