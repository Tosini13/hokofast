import { Stack } from "@mui/material";
import { Id } from "../../../types/utils";
import { TWorkspace } from "../../../types/workspaces";
import AddWorkspaceButton from "./workspace/AddWorkspaceButton";
import Workspace from "./workspace/Workspace";
import WorkspaceContainer from "./workspace/WorkspaceContainer";

type TWorkspacesProps = {
  workspaces: TWorkspace[];
  activeWorkspaceId?: Id;
};

const Workspaces: React.FC<TWorkspacesProps> = ({
  workspaces,
  activeWorkspaceId,
}) => {
  return (
    <Stack spacing={2}>
      {workspaces.map((workspace) => (
        <div>
          <WorkspaceContainer
            key={workspace.id}
            isActive={workspace.id === activeWorkspaceId}
          >
            <Workspace workspace={workspace} />
          </WorkspaceContainer>
        </div>
      ))}
      <WorkspaceContainer>
        <AddWorkspaceButton />
      </WorkspaceContainer>
    </Stack>
  );
};

export default Workspaces;
