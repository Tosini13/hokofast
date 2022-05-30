import { Id } from "./utils";

import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const SWorkspace = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  users: {
    type: [String],
    required: false,
  },
});

export type TWorkspace = {
  name: string;
  author: Id;
  users: Id[];
};

export type TWorkspaceRes = TWorkspace & {
  id: Id;
};

export interface IWorkspace extends Document {
  name: string;
  author: Id;
  users: Id[];
}

const Workspace = mongoose.model<IWorkspace>("workspaces", SWorkspace);

export default Workspace;
