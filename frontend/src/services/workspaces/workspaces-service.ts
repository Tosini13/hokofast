import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  SERVER_URL,
  WORKSPACES_API_URL,
  WORKSPACE_API_URL,
} from "../../models/endpoints";
import { TWorkspace } from "../../types/workspaces";
import useAsync from "../../utils/useAsync";
import socketIOClient from "socket.io-client";
import { EEvents, TEventBody, TEventParams } from "../../types/backend/events";

const getWorkspaces = () =>
  axios
    .get<{ data: TWorkspace[] }>(WORKSPACES_API_URL)
    .then((data) => data.data);

export const useWorkspacesService = () => {
  const [workspaces, setWorkspaces] = useState<TWorkspace[]>([]);
  const { execute, isProcessing } = useAsync();

  const socket = useMemo(() => socketIOClient(SERVER_URL), []);

  useEffect(() => {
    async function fetchData() {
      const workspaces = await execute(getWorkspaces());
      setWorkspaces(workspaces.data);
    }
    fetchData();
  }, [execute]);

  useEffect(() => {
    socket.on(EEvents.createdWorkspace, (data: TEventBody<TWorkspace>) => {
      setWorkspaces((prev) => [...(prev ?? []), data.data]);
    });

    socket.on(
      EEvents.updatedWorkspace,
      (data: TEventBody<TWorkspace, TEventParams>) => {
        setWorkspaces((prev) =>
          prev?.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    );

    socket.on(
      EEvents.deletedWorkspace,
      (data: TEventBody<TWorkspace, TEventParams>) => {
        setWorkspaces((prev) =>
          prev?.filter((item) => item.id !== data.data.id)
        );
      }
    );
  }, [socket]);

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
