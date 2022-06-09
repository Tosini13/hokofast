import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EPath } from "../../../../routing/paths";
import { deleteWorkspace } from "../../../../services/workspaces/workspaces-service";
import useAsync from "../../../../utils/useAsync";
import WorkspaceContainer from "../workspace/WorkspaceContainer";
import DeleteWorkspaceButton from "./DeleteWorkspaceButton";

type TDeleteWorkspaceProps = { workspaceId: string; workspaceName: string };

const DeleteWorkspace: React.FC<TDeleteWorkspaceProps> = ({
  workspaceId,
  workspaceName,
}) => {
  const navigate = useNavigate();
  const { execute, isProcessing } = useAsync();

  const handleDelete = useCallback(async () => {
    try {
      await execute(deleteWorkspace({ id: workspaceId }));
      navigate(EPath.home);
    } catch (e) {
      console.log("e", e);
    }
  }, [workspaceId, execute, navigate]);

  return (
    <WorkspaceContainer>
      <DeleteWorkspaceButton
        workspaceName={workspaceName}
        handleClick={handleDelete}
        isProcessing={isProcessing}
      />
    </WorkspaceContainer>
  );
};

export default DeleteWorkspace;
