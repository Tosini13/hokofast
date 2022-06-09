import axios from "axios";
import { useEffect, useState } from "react";
import { TUser } from "../../models/backend";
import { TUserAPIQuery, USERS_API_URL } from "../../models/endpoints";
import useAsync from "../../utils/useAsync";

export const getUsers = (props: TUserAPIQuery) =>
  axios.get<TUser[]>(USERS_API_URL(props)).then((data) => data.data);

export const useUsersService = ({ nickname }: TUserAPIQuery) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const { execute, isProcessing } = useAsync();

  useEffect(() => {
    async function fetchData() {
      const users = await execute(getUsers({ nickname }));
      setUsers(users);
    }
    fetchData();
  }, [execute, nickname]);

  return { users, isProcessing };
};
