import { AddCircleOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import WorkspaceTitle from "./WorkspaceTitle";

type TAddWorkspaceButtonProps = {};

const AddWorkspaceButton: React.FC<TAddWorkspaceButtonProps> = () => {
  return (
    <Stack spacing={1} alignItems="center">
      <AddCircleOutlined />
      <WorkspaceTitle>Add Workspace</WorkspaceTitle>
    </Stack>
  );
};

export default AddWorkspaceButton;
