import { Request, Response } from "express";
import mongoose from "mongoose";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { IVerifyTokenRequest } from "../middleware/auth";
import { EEvents, TEventBody } from "../models/events";
import { EGetUser } from "../models/messages/users";
import Workspace, {
  IWorkspace,
  TWorkspace,
  TWorkspaceRes,
} from "../models/workspace";
import { createError } from "./backend-messages";

const getWorkspaceFromBody = (
  body: Omit<TWorkspace, "dateTime">
): TWorkspace => ({
  name: body.name,
  author: body.author,
  users: body.users,
});

export const convertWorkspace = (
  doc: LeanDocument<IWorkspace>
): TWorkspaceRes => ({
  id: doc._id,
  name: doc.name,
  author: doc.author,
  users: doc.users,
});

export const convertUsersWorkspace = (
  doc: LeanDocument<IWorkspace>
): Omit<TWorkspaceRes, "users"> => ({
  id: doc._id,
  name: doc.name,
  author: doc.author,
});

export const getWorkspaces = async (
  req: IVerifyTokenRequest,
  res: Response
) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError(EGetUser.UNAUTHORIZED));
  }

  try {
    const workspaces = await Workspace.find({
      author: currentUser.user_id,
    }).sort({
      name: 1,
    });

    const guestWorkspaces = await Workspace.find({
      users: currentUser.user_id,
    }).sort({
      name: 1,
    });
    console.log("guestWorkspaces", guestWorkspaces);
    res.send({
      data: [
        ...workspaces.map((workspace) => convertWorkspace(workspace)),
        ...guestWorkspaces.map((workspace) => convertWorkspace(workspace)),
      ],
    });
  } catch (e) {
    console.error(e);
  }
};

export const getUserWorkspaces = async (
  req: IVerifyTokenRequest,
  res: Response
) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError("Guest is not provided"));
  }

  try {
    const workspaces = await Workspace.find({
      guests: {
        $in: [currentUser.user_id],
      },
    }).sort({
      dateTime: 1,
    });
    res.send({
      data: workspaces.map((workspace) => convertUsersWorkspace(workspace)),
    });
  } catch (e) {
    console.error(e);
  }
};

export const createWorkspace = async (
  req: IVerifyTokenRequest,
  res: Response
) => {
  const body: Omit<TWorkspace, "author" | "dateTime"> = req.body;
  const currentUser = req.currentUser;
  const workspaceData = getWorkspaceFromBody({
    ...body,
    author: currentUser.user_id,
  });
  try {
    const newWorkspace = await Workspace.create(workspaceData);
    const workspace = convertWorkspace(newWorkspace);

    const emitBody: TEventBody<TWorkspace> = {
      data: workspace,
    };
    io.emit(EEvents.createdWorkspace, emitBody);
    res.send(workspace);
  } catch (e) {
    console.error(e);
  }
};

export const updateWorkspace = async (
  req: IVerifyTokenRequest,
  res: Response
) => {
  const body: Omit<TWorkspace, "author" | "dateTime"> = req.body;
  const currentUser = req.currentUser;
  const workspace = getWorkspaceFromBody({
    ...body,
    author: currentUser.user_id,
  });

  try {
    await Workspace.updateOne({ _id: req.params.workspaceId }, workspace);
    const emitBody: TEventBody<TWorkspace> = {
      data: workspace,
    };
    io.emit(EEvents.updatedWorkspace, emitBody);
    res.send(workspace);
  } catch (e) {
    console.error(e);
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const deletedWorkspace = await Workspace.findByIdAndRemove({
      _id: req.params.workspaceId,
    });
    const workspace = convertWorkspace(deletedWorkspace);
    const emitBody: TEventBody<TWorkspace> = {
      data: workspace,
    };
    io.emit(EEvents.deletedWorkspace, emitBody);
    res.send(workspace);
  } catch (e) {
    console.error(e);
  }
};
