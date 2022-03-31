import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { io } from "..";
import { EEvents } from "../models/events";
import List, { IList, TList, TListRes } from "../models/list";

const getListFromBody = (body: TList): TList => ({
  name: body.name,
  dateTime: new Date().toString(),
});

export const convertList = (doc: LeanDocument<IList>): TListRes => ({
  id: doc._id,
  name: doc.name,
  dateTime: doc.dateTime,
});

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find({}).sort({
      dateTime: 1,
    });
    res.send({ data: lists.map((list) => convertList(list)) });
  } catch (e) {
    console.error(e);
  }
};

export const createList = async (req: Request, res: Response) => {
  const listData = getListFromBody(req.body);
  try {
    const newList = await List.create(listData);
    const list = convertList(newList);

    io.emit(EEvents.createdList, list);
    res.send(list);
  } catch (e) {
    console.error(e);
  }
};

export const updateList = async (req: Request, res: Response) => {
  const list = getListFromBody(req.body);

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
    const list = await List.findByIdAndRemove({ _id: req.params.listId });
    io.emit(EEvents.deletedList, list);
    res.send(convertList(list));
  } catch (e) {
    console.error(e);
  }
};
