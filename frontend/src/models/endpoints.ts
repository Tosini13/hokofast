import { Id } from "../types/utils";

// ======================== URL ===========================
export const SERVER_URL = process.env.REACT_APP_SERVER_DOMAIN as string;

const API_URL = `${SERVER_URL}/api`;

export const ITEMS_API_URL = (listId: Id) => `${API_URL}/lists/${listId}/items`;
export const ITEM_API_URL = (listId: Id, itemId: Id) =>
  `${API_URL}/lists/${listId}/items/${itemId}`;

export const LISTS_API_URL = `${API_URL}/lists`;
export const LISTS_GUEST_API_URL = `${API_URL}/lists-guest`;
export const LIST_API_URL = (listId: Id) => `${API_URL}/lists/${listId}`;

/* ---------------- WORKSPACES ------------------- */
export const WORKSPACES_API_URL = `${API_URL}/workspaces`;
export const WORKSPACES_USERS_API_URL = `${API_URL}/workspaces-guest`;
export const WORKSPACE_API_URL = (workspaceId: Id) =>
  `${API_URL}/workspaces/${workspaceId}`;

/* ---------------- AUTH ------------------- */
export const LOGIN_API_URL = `${API_URL}/login`;
export const RESET_PASSWORD_API_URL = `${API_URL}/reset-password`;
export const CHECK_TOKEN_API_URL = `${API_URL}/check-token`;
export const IS_LOGGED_IN_API_URL = `${API_URL}/is-logged-in`;
export const SET_PASSWORD_API_URL = `${API_URL}/set-password`;
export const SIGN_UP_API_URL = `${API_URL}/register`;

/* ---------------- USERS ------------------- */
export const CURRENT_USER_API_URL = `${API_URL}/user`;
export const USER_API_URL = (id: Id) => `${API_URL}/user/${id}`;

export type TUserAPIQuery = {
  nickname?: string;
};
export const USERS_API_URL = ({ nickname }: TUserAPIQuery) =>
  `${API_URL}/users?${nickname ? `nickname=${nickname}&` : ""}`;
