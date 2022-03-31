import { Id } from "./utils";

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const SList = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  dateTime: {
    type: String,
    required: [true, "dateTime is required"],
  },
});

export type TList = {
  name: string;
  dateTime: string;
};

export type TListRes = TList & {
  id: Id;
};

export interface IList extends Document {
  name: string;
  dateTime: string;
}

const List = mongoose.model<IList>("lists", SList);

export default List;
