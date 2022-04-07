export enum EPath {
  home = "/",
  list = "/list/:listId",
  addList = "/add-list",
  colaboration = "/colaboration",
}

export const toPath = {
  list: (listId: string) => `/list/${listId}`,
};
