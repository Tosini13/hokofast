import mongoose, { Document } from "mongoose";
import { Id } from "./utils";

const Schema = mongoose.Schema;

const SUser = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  nickname: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  token: {
    type: String,
  },
});

export type TUserData = {
  email: string;
  token: string;
  password: string;
  nickname?: string;
};

export type TUser = TUserData & {
  id: Id;
};

export interface IUser extends Document {
  email: string;
  password: string;
  token: string;
  nickname?: string;
}

const User = mongoose.model<IUser>("users", SUser);

export default User;
