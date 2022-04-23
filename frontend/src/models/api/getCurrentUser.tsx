import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { TUser } from "../../models/backend";
import { CURRENT_USER_API_URL } from "../../models/endpoints";

export type TGetCurrentUserParams = Pick<TUser, "token">;
export type TGetCurrentUserResult = Omit<TUser, "password">;

export const getCurrentUser = async ({ token }: TGetCurrentUserParams) =>
  await axios.get<TGetCurrentUserResult>(CURRENT_USER_API_URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-access-token": token,
    },
  });

export type TUseGetCurrentUser = {
  response?: AxiosResponse<TGetCurrentUserResult, any>;
  reExecute: () => Promise<void>;
};

export const useGetCurrentUser = (): TUseGetCurrentUser => {
  const [response, setResponse] = useState<
    AxiosResponse<TGetCurrentUserResult> | undefined
  >();

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token") ?? "";
    const res = await getCurrentUser({ token });
    setResponse(res);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { response, reExecute: fetch };
};
