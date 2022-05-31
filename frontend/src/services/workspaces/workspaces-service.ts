import axios from "axios";
import { useEffect, useState } from "react";
import { WORKSPACES_API_URL } from "../../models/endpoints";
import { TWorkspace } from "../../types/workspaces";
import useAsync from "../../utils/useAsync";

const getWorkspaces = () =>
  axios
    .get<{ data: TWorkspace[] }>(WORKSPACES_API_URL)
    .then((data) => data.data);

export const useWorkspacesService = () => {
  const [workspaces, setWorkspaces] = useState<TWorkspace[]>([]);
  const { execute, isProcessing } = useAsync();

  useEffect(() => {
    async function fetchData() {
      const workspaces = await execute(getWorkspaces());
      setWorkspaces(workspaces.data);
    }
    fetchData();
  }, [execute]);

  return { workspaces, isProcessing };
};

export const addWorkspace = async (data: Omit<TWorkspace, "id" | "author">) =>
  await axios.post<TWorkspace>(WORKSPACES_API_URL, data);
