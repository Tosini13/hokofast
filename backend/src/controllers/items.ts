import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { EEvents, TEventBody } from "../models/events";
import { TEventParams } from "../models/events/items";
import Item, { IItem, TItem, TItemRes } from "../models/item";
import { checkIfWorkspaceExists } from "./actions/workspaces";
import { sendMessage } from "./backend-messages";

const getItemFromBody = (
  body: Omit<TItem, "workspaceId">,
  params: { workspaceId?: string }
): TItem => ({
  workspace: params?.workspaceId,
  ...body,
});

export const convertItem = ({
  _id,
  name,
  workspace,
  category,
  taken,
}: LeanDocument<IItem>): TItemRes => ({
  id: _id,
  name,
  workspace,
  category,
  taken,
});

export const getItems = async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId;
  const categoryId = req.query.category;
  const findParams = {
    workspace: workspaceId,
    ...(categoryId ? { category: categoryId } : {}),
  };

  try {
    const items = await Item.find(findParams);
    res.send(items.map((item) => convertItem(item)));
  } catch (e) {
    console.error(e);
  }
};

export const createItem = async (req: Request, res: Response) => {
  const itemData = getItemFromBody({ ...req.body, taken: false }, req.params);
  const ifListExists = await checkIfWorkspaceExists(itemData.workspace);

  if (!ifListExists) {
    res.send(sendMessage("NO_WORKSPACE_FOUND"));
    return;
  }

  try {
    const newItem = await Item.create(itemData);
    const item = convertItem(newItem);

    const emitBody: TEventBody<TItem, TEventParams> = {
      data: item,
      params: {
        workspaceId: item.workspace,
        categoryId: item.category,
      },
    };
    io.emit(EEvents.createdItem, emitBody);
    res.send(item);
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const item = getItemFromBody(req.body, req.params);
  const ifListExists = await checkIfWorkspaceExists(item.workspace);

  if (!ifListExists) {
    res.send(sendMessage("NO_WORKSPACE_FOUND"));
    return;
  }

  try {
    await Item.updateOne({ _id: req.params.itemId }, item);
    const emitBody: TEventBody<TItem, TEventParams> = {
      data: item,
      params: {
        workspaceId: item.workspace,
        categoryId: item.category,
      },
    };
    io.emit(EEvents.updatedItem, emitBody);
    res.send(item);
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Item.findByIdAndRemove({
      _id: req.params.itemId,
    });
    const item = convertItem(deletedItem);
    const emitBody: TEventBody<TItem, TEventParams> = {
      data: item,
      params: {
        workspaceId: item.workspace,
        categoryId: item.category,
      },
    };
    io.emit(EEvents.deletedItem, emitBody);
    res.send(item);
  } catch (e) {
    console.error(e);
  }
};
