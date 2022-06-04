import { Id } from "./utils";

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const SCategory = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
});

export type TCategory = {
  name: string;
};

export type TCategoryRes = TCategory & {
  id: Id;
};

export interface ICategory extends Document {
  name: string;
}

const Category = mongoose.model<ICategory>("categories", SCategory);

export default Category;
