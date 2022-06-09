import { Avatar, Stack } from "@mui/material";
import { TWorkspace } from "../../../../types/workspaces";
import DefaultAvatar from "../../../../resources/svg/default_avatar.svg";
import WorkspaceTitle from "./WorkspaceTitle";
import { useNavigate } from "react-router-dom";
import { toPath } from "../../../../routing/paths";
import { useCallback } from "react";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  const { id } = workspace;
  const navigate = useNavigate();

  const goToWorkspace = useCallback(() => {
    navigate(toPath.workspace(id));
  }, [navigate, id]);

  return (
    <Stack spacing={1} alignItems="center" onClick={goToWorkspace}>
      <Avatar alt="user's avatar" src={DefaultAvatar} />
      <WorkspaceTitle>{workspace.name}</WorkspaceTitle>
    </Stack>
  );
};

export default Workspace;
