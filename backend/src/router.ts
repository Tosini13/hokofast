import express from "express";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "./controllers/items";
import {
  createList,
  deleteList,
  getLists,
  updateList,
} from "./controllers/lists";

const router = express.Router();

// -----------------------------------------
// ITEMS
router.get("/lists/:listId/items", getItems);
router.post("/lists/:listId/items", createItem);
router.put("/lists/:listId/items/:itemId", updateItem);
router.delete("/lists/:listId/items/:itemId", deleteItem);

// -----------------------------------------
// LISTS
router.get("/lists", getLists);
router.post("/lists", createList);
router.put("/lists/:listId", updateList);
router.delete("/lists/:listId", deleteList);

export default router;
