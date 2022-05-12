import { Request, Response } from "express";
import mongoose from "mongoose";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { IVerifyTokenRequest } from "../middleware/auth";
import { EEvents } from "../models/events";
import List, { IList, TList, TListRes } from "../models/list";
import { EGetUser } from "../models/messages/users";
import { createError } from "./backend-messages";

const getListFromBody = (body: Omit<TList, "dateTime">): TList => ({
  name: body.name,
  dateTime: new Date().toString(),
  author: body.author,
  guests: body.guests,
});

export const convertList = (doc: LeanDocument<IList>): TListRes => ({
  id: doc._id,
  name: doc.name,
  dateTime: doc.dateTime,
  author: doc.author,
  guests: doc.guests,
});

export const convertGuestList = (
  doc: LeanDocument<IList>
): Omit<TListRes, "guests"> => ({
  id: doc._id,
  name: doc.name,
  dateTime: doc.dateTime,
  author: doc.author,
});

export const getLists = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError(EGetUser.UNAUTHORIZED));
  }

  try {
    const lists = await List.find({ author: currentUser.user_id }).sort({
      dateTime: 1,
    });
    res.send({ data: lists.map((list) => convertList(list)) });
  } catch (e) {
    console.error(e);
  }
};

export const getGuestLists = async (
  req: IVerifyTokenRequest,
  res: Response
) => {
  const currentUser = req.currentUser;

  if (!currentUser) {
    return res.status(200).send(createError("Guest is not provided"));
  }

  try {
    const lists = await List.find({
      guests: {
        $in: [currentUser.user_id],
      },
    }).sort({
      dateTime: 1,
    });
    res.send({ data: lists.map((list) => convertGuestList(list)) });
  } catch (e) {
    console.error(e);
  }
};

export const createList = async (req: IVerifyTokenRequest, res: Response) => {
  const body: Omit<TList, "author" | "dateTime"> = req.body;
  const currentUser = req.currentUser;
  const listData = getListFromBody({
    ...body,
    author: currentUser.user_id,
  });
  try {
    const newList = await List.create(listData);
    const list = convertList(newList);

    io.emit(EEvents.createdList, list);
    res.send(list);
  } catch (e) {
    console.error(e);
  }
};

export const updateList = async (req: IVerifyTokenRequest, res: Response) => {
  const body: Omit<TList, "author" | "dateTime"> = req.body;
  const currentUser = req.currentUser;
  const list = getListFromBody({
    ...body,
    author: currentUser.user_id,
  });

  try {
    await List.updateOne({ _id: req.params.listId }, list);
    io.emit(EEvents.updatedList, list);
    res.send(list);
  } catch (e) {
    console.error(e);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const deletedList = await List.findByIdAndRemove({
      _id: req.params.listId,
    });
    const list = convertList(deletedList);
    io.emit(EEvents.deletedList, list);
    res.send(list);
  } catch (e) {
    console.error(e);
  }
};
