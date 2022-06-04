import { Stack } from "@mui/material";
import { TWorkspace } from "../../../types/workspaces";
import AddWorkspaceButton from "./workspace/AddWorkspaceButton";
import Workspace from "./workspace/Workspace";
import WorkspaceContainer from "./workspace/WorkspaceContainer";

type TWorkspacesProps = {
  workspaces: TWorkspace[];
};

const Workspaces: React.FC<TWorkspacesProps> = ({ workspaces }) => {
  return (
    <Stack spacing={3}>
      {workspaces.map((workspace) => (
        <WorkspaceContainer key={workspace.id} isActive={workspace.id === "1"}>
          <Workspace workspace={workspace} />
        </WorkspaceContainer>
      ))}
      <WorkspaceContainer>
        <AddWorkspaceButton />
      </WorkspaceContainer>
    </Stack>
  );
};

export default Workspaces;
