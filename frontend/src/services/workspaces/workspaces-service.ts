import axios from "axios";
import { useEffect, useState } from "react";
import { WORKSPACES_API_URL, WORKSPACE_API_URL } from "../../models/endpoints";
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

  /**
   * @todo add activeWorkspace
   */
  return { workspaces, isProcessing };
};

type TAddWorkspaceProps = Omit<TWorkspace, "id" | "author">;
export const addWorkspace = async (data: TAddWorkspaceProps) =>
  await axios.post<TWorkspace>(WORKSPACES_API_URL, data);

type TDeleteWorkspaceProps = Pick<TWorkspace, "id">;
export const deleteWorkspace = async (data: TDeleteWorkspaceProps) =>
  await axios.delete<TWorkspace>(WORKSPACE_API_URL(data.id));
