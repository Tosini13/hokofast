import { Id } from "./utils";

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const SItem = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  workspace: {
    type: String,
    required: [true, "workspace is required"],
  },
  category: {
    type: String,
  },
  taken: {
    type: Boolean,
    required: [true, "taken is required"],
  },
});

export type TItem = {
  name: string;
  workspace: Id;
  category?: Id;
  taken: boolean;
};

export type TItemRes = TItem & {
  id: Id;
};

export interface IItem extends Document {
  name: string;
  workspace: Id;
  category?: Id;
  taken: boolean;
}

const Item = mongoose.model<IItem>("items", SItem);

export default Item;
