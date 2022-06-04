import { Avatar, Stack } from "@mui/material";
import { TWorkspace } from "../../../../types/workspaces";
import DefaultAvatar from "../../../../resources/svg/default_avatar.svg";
import WorkspaceTitle from "./WorkspaceTitle";
import { Link } from "react-router-dom";
import { toPath } from "../../../../routing/paths";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  return (
    <Link to={toPath.workspace(workspace.id)}>
      <Stack spacing={1} alignItems="center">
        <Avatar alt="user's avatar" src={DefaultAvatar} />
        <WorkspaceTitle>{workspace.name}</WorkspaceTitle>
      </Stack>
    </Link>
  );
};

export default Workspace;
