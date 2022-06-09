import { AddCircleOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EPath } from "../../../../routing/paths";
import WorkspaceTitle from "./WorkspaceTitle";

type TAddWorkspaceButtonProps = {};

const AddWorkspaceButton: React.FC<TAddWorkspaceButtonProps> = () => {
  const navigate = useNavigate();
  const goToAddWorkspace = useCallback(
    () => navigate(EPath.addWorkspace),
    [navigate]
  );
  return (
    <Stack spacing={1} alignItems="center" onClick={goToAddWorkspace}>
      <AddCircleOutlined />
      <WorkspaceTitle>Add Workspace</WorkspaceTitle>
    </Stack>
  );
};

export default AddWorkspaceButton;
