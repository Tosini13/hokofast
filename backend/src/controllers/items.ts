import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { IVerifyTokenRequest } from "../middleware/auth";
import { EEvents, TEventBody } from "../models/events";
import { TEventParams } from "../models/events/items";
import Item, { IItem, TItem, TItemRes } from "../models/item";
import { EGetUser } from "../models/messages/users";
import { Id } from "../models/utils";
import {
  getCategoryAndWorkspaceItems,
  getCategoryItems,
  getWorkspaceItems,
  getWorkspacesItems,
} from "./actions/items";
import {
  checkIfUserHasRightsToWorkspace,
  getWorkspacesForUser,
} from "./actions/workspaces";
import { createError, sendMessage } from "./backend-messages";

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

export const getAllItems = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError(EGetUser.UNAUTHORIZED));
  }

  const { workspaceId, categoryId } = req.query as {
    workspaceId?: Id;
    categoryId?: Id;
  };

  try {
    if (workspaceId && categoryId) {
      const hasRights = await checkIfUserHasRightsToWorkspace(
        workspaceId,
        currentUser.user_id
      );

      if (!hasRights) {
        res.send(sendMessage(EGetUser.UNAUTHORIZED));
        return;
      }

      const items = await getCategoryAndWorkspaceItems(workspaceId, categoryId);
      res.send(items.map((item) => convertItem(item)));
      return;
    }

    if (workspaceId) {
      const hasRights = await checkIfUserHasRightsToWorkspace(
        workspaceId,
        currentUser.user_id
      );

      if (!hasRights) {
        res.send(sendMessage(EGetUser.UNAUTHORIZED));
        return;
      }

      const items = await getWorkspaceItems(workspaceId);
      res.send(items.map((item) => convertItem(item)));
      return;
    }

    if (categoryId) {
      const workspaces = await getWorkspacesForUser(currentUser.user_id);
      const items = await getCategoryItems(
        workspaces.map((w) => w._id),
        categoryId
      );
      res.send(items.map((item) => convertItem(item)));
      return;
    }

    const workspaces = await getWorkspacesForUser(currentUser.user_id);
    const items = await getWorkspacesItems(
      workspaces.map((workspace) => workspace._id)
    );
    res.send(items.map((item) => convertItem(item)));
  } catch (e) {
    console.error(e);
  }
};

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

export const createItem = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError(EGetUser.UNAUTHORIZED));
  }

  const itemData = getItemFromBody({ ...req.body, taken: false }, req.params);
  const ifWorkspaceExists = await checkIfUserHasRightsToWorkspace(
    itemData.workspace,
    currentUser.user_id
  );

  if (!ifWorkspaceExists) {
    res.send(sendMessage(EGetUser.UNAUTHORIZED));
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

export const updateItem = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError(EGetUser.UNAUTHORIZED));
  }

  const item = getItemFromBody(req.body, req.params);
  const ifListExists = await checkIfUserHasRightsToWorkspace(
    item.workspace,
    currentUser.user_id
  );

  if (!ifListExists) {
    res.send(sendMessage(EGetUser.UNAUTHORIZED));
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

export const deleteItem = async (req: IVerifyTokenRequest, res: Response) => {
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
