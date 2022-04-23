import axios from "axios";
import { TUser } from "../../models/backend";
import { SIGN_UP_API_URL } from "../../models/endpoints";

export type TSignUpParams = Pick<TUser, "email" | "password">;
export type TSignUpResult = Omit<TUser, "password">;

export const signUp = async (data: TSignUpParams) =>
  await axios.post<TSignUpResult>(SIGN_UP_API_URL, data);
