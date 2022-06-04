import express from "express";
import {
  checkToken,
  isLoggedIn,
  login,
  register,
  resetPassword,
  setPassword,
} from "./controllers/auth";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "./controllers/items";
import {
  createList,
  deleteList,
  getGuestLists,
  getLists,
  updateList,
} from "./controllers/lists";
import { getUser, getUsers, updateUser } from "./controllers/users";
import {
  createWorkspace,
  deleteWorkspace,
  getUserWorkspaces,
  getWorkspaces,
  updateWorkspace,
} from "./controllers/workspace";
import { verifyToken } from "./middleware/auth";

const router = express.Router();

// -----------------------------------------
// AUTH
router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", resetPassword);
router.post("/check-token", checkToken);
router.post("/is-logged-in", verifyToken, isLoggedIn);
router.post("/set-password", setPassword);

// -----------------------------------------
// USERS
router.get("/users", verifyToken, getUsers);
router.get("/user", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);

// -----------------------------------------
// ITEMS
router.get("/lists/:listId/items", getItems);
router.post("/lists/:listId/items", createItem);
router.put("/lists/:listId/items/:itemId", updateItem);
router.delete("/lists/:listId/items/:itemId", deleteItem);

// -----------------------------------------
// LISTS
router.get("/lists", verifyToken, getLists);
router.get("/lists-guest", verifyToken, getGuestLists);
router.post("/lists", verifyToken, createList);
router.put("/lists/:listId", verifyToken, updateList);
router.delete("/lists/:listId", deleteList);

// -----------------------------------------
// WORKSPACE
router.get("/workspaces", verifyToken, getWorkspaces);
router.get("/workspaces-guest", verifyToken, getUserWorkspaces);
router.post("/workspaces", verifyToken, createWorkspace);
router.put("/workspaces/:workspaceId", verifyToken, updateWorkspace);
router.delete("/workspaces/:workspaceId", deleteWorkspace);

export default router;
