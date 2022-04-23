import { Id } from "../types/utils";

export type TList = {
  id: Id;
  name: string;
  dateTime: string;
};

export type TUser = {
  id: Id;
  nickname?: string;
  email: string;
  password: string;
  token: string;
};

export enum EIsLoggedIn {
  "LOGGED_IN" = "LOGGED_IN",
  "LOGGED_OUT" = "LOGGED_OUT",
}
