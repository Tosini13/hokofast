import { Typography } from "@mui/material";
import { TWorkspace } from "../../../types/workspaces";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  return (
    <Typography textAlign={"center"} variant="h3">
      {workspace.name}
    </Typography>
  );
};

export default Workspace;
