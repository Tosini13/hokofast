import { Id } from "./utils";

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const SItem = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  list: {
    type: String,
    required: [true, "list is required"],
  },
});

export type TItem = {
  name: string;
  list: Id;
};

export type TItemRes = TItem & {
  id: Id;
};

export interface IItem extends Document {
  name: string;
  list: Id;
}

const Item = mongoose.model<IItem>("items", SItem);

export default Item;
