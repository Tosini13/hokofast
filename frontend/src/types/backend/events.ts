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
  createdCategory = "CREATED_CATEGORY",
  updatedCategory = "UPDATED_CATEGORY",
  deletedCategory = "DELETED_CATEGORY",
}

export type TEventBody<TData, TParams = void | undefined> = {
  data: TData;
  params: TParams;
};

export type TEventParams = {
  workspaceId: string;
  categoryId?: string;
};
