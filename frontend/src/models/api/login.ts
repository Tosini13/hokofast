import axios from "axios";
import { TUser } from "../../models/backend";
import { LOGIN_API_URL } from "../../models/endpoints";

export type TLogInParams = Pick<TUser, "email" | "password">;
export type TLogInResult = Omit<TUser, "password">;

export const logIn = async (data: TLogInParams) =>
  await axios.post<TLogInResult>(LOGIN_API_URL, data);
