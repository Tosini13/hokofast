import mongoose, { Document } from "mongoose";
import { Id } from "./utils";

const Schema = mongoose.Schema;

const SToken = new Schema({
  token: {
    type: String,
    required: [true, "token is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  expireDate: {
    type: String,
  },
});

export type TTokenData = {
  token: string;
  email: string;
  expireDate: string;
};

export type TToken = TTokenData & {
  id: Id;
};

export interface IToken extends Document {
  token: string;
  email: string;
  expireDate: string;
}

const Token = mongoose.model<IToken>("tokens", SToken);

export default Token;
