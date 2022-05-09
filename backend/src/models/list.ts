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
  author: {
    type: String,
    required: [true, "author is required"],
  },
  guests: {
    type: [String],
    required: false,
  },
});

export type TList = {
  name: string;
  dateTime: string;
  author: Id;
  guests: Id[];
};

export type TListRes = TList & {
  id: Id;
};

export interface IList extends Document {
  name: string;
  dateTime: string;
  author: Id;
  guests: Id[];
}

const List = mongoose.model<IList>("lists", SList);

export default List;
