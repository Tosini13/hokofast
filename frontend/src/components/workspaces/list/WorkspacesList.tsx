import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { toPath } from "../../../routing/paths";
import { TWorkspace } from "../../../types/workspaces";
import WorkspaceItem from "./WorkspaceItem";

type TWorkspacesListProps = {
  workspaces: TWorkspace[];
};

const WorkspacesList: React.FC<TWorkspacesListProps> = ({ workspaces }) => {
  return (
    <Stack spacing={2}>
      {workspaces.map((workspace) => (
        <Link
          key={workspace.id}
          to={toPath.workspace(workspace.id)}
          style={{ textDecoration: "none" }}
        >
          <WorkspaceItem workspace={workspace} />
        </Link>
      ))}
    </Stack>
  );
};

export default WorkspacesList;
