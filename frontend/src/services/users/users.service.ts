import axios from "axios";
import { useEffect, useState } from "react";
import { TUser } from "../../models/backend";
import { TUserAPIQuery, USERS_API_URL } from "../../models/endpoints";
import useAsync from "../../utils/useAsync";

export const getUsers = (props: TUserAPIQuery) =>
  axios.get<{ data: TUser[] }>(USERS_API_URL(props)).then((data) => data.data);

export const useUsersService = (props: TUserAPIQuery) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const { execute, isProcessing } = useAsync();

  useEffect(() => {
    async function fetchData() {
      const users = await execute(getUsers(props));
      setUsers(users.data);
    }
    fetchData();
  }, [execute, props]);

  return { users, isProcessing };
};
