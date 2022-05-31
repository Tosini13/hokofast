export enum EPath {
  home = "/",
  list = "/list/:listId",
  addList = "/add-list",
  addWorkspace = "/add-workspace",
  colaboration = "/colaboration",
  signIn = "/sign-in",
  signUp = "/sign-up",
}

export const toPath = {
  list: (listId: string) => `/list/${listId}`,
  workspace: (workspaceId: string) => `/workspace/${workspaceId}`,
};
