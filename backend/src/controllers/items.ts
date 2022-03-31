import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { EEvents } from "../models/events";
import Item, { IItem, TItem, TItemRes } from "../models/item";
import List from "../models/list";
import { checkIfListExists } from "./actions/lists";
import { sendMessage } from "./backend-messages";

const getItemFromBody = (
  body: Omit<TItem, "list">,
  params: { listId?: string }
): TItem => ({
  name: body.name,
  list: params?.listId,
});

export const convertItem = (doc: LeanDocument<IItem>): TItemRes => ({
  id: doc._id,
  name: doc.name,
  list: doc.list,
});

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({ list: req.params.listId });
    res.send(items.map((item) => convertItem(item)));
  } catch (e) {
    console.error(e);
  }
};

export const createItem = async (req: Request, res: Response) => {
  const itemData = getItemFromBody(req.body, req.params);
  const ifListExists = await checkIfListExists(itemData.list);

  if (!ifListExists) {
    res.send(sendMessage("NO_LIST_FOUND"));
    return;
  }

  try {
    const newItem = await Item.create(itemData);
    const item = convertItem(newItem);

    io.emit(EEvents.createdItem, item);
    res.send(item);
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const item = getItemFromBody(req.body, req.params);
  const ifListExists = await checkIfListExists(item.list);

  if (!ifListExists) {
    res.send(sendMessage("NO_LIST_FOUND"));
    return;
  }

  try {
    await Item.updateOne({ _id: req.params.itemId }, item);
    io.emit(EEvents.updatedItem, item);
    res.send(item);
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndRemove({ _id: req.params.itemId });
    io.emit(EEvents.deletedItem, item);
    res.send(convertItem(item));
  } catch (e) {
    console.error(e);
  }
};
