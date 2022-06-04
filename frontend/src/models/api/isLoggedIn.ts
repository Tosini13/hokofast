import axios from "axios";
import { EIsLoggedIn } from "../../models/backend";
import { IS_LOGGED_IN_API_URL } from "../../models/endpoints";
import { Id } from "../../types/utils";

export type TIsLoggedInParams = { token: string };
export type TIsLoggedInResult = {
  message: EIsLoggedIn;
  userId: Id;
};

export const isLoggedIn = async ({ token }: TIsLoggedInParams) =>
  await axios.post<TIsLoggedInResult>(IS_LOGGED_IN_API_URL, { token });
