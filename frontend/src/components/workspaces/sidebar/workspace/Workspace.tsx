import { Avatar, Stack } from "@mui/material";
import { TWorkspace } from "../../../../types/workspaces";
import DefaultAvatar from "../../../../resources/svg/default_avatar.svg";
import WorkspaceTitle from "./WorkspaceTitle";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Avatar alt="user's avatar" src={DefaultAvatar} />
      <WorkspaceTitle>{workspace.name}</WorkspaceTitle>
    </Stack>
  );
};

export default Workspace;
