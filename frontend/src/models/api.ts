import { Id } from "../types/utils";

// ======================== URL ===========================
export const SERVER_URL = process.env.REACT_APP_SERVER_DOMAIN as string;

const API_URL = `${SERVER_URL}/api`;

export const ITEMS_API_URL = (listId: Id) => `${API_URL}/lists/${listId}/items`;
export const ITEM_API_URL = (listId: Id, itemId: Id) =>
  `${API_URL}/lists/${listId}/items/${itemId}`;

export const LISTS_API_URL = `${API_URL}/lists`;
export const LIST_API_URL = (listId: Id) => `${API_URL}/lists/${listId}`;
