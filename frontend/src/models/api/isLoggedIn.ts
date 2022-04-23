import axios from "axios";
import { EIsLoggedIn } from "../../models/backend";
import { IS_LOGGED_IN_API_URL } from "../../models/endpoints";

export type TIsLoggedInParams = { token: string };
export type TIsLoggedInResult = {
  message: EIsLoggedIn;
};

export const isLoggedIn = async ({ token }: TIsLoggedInParams) =>
  await axios.post<TIsLoggedInResult>(IS_LOGGED_IN_API_URL, { token });
