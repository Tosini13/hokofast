import { DeleteOutline } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { LoadingIcon } from "../../../utils/Loading";
import WorkspaceTitle from "../workspace/WorkspaceTitle";
import DeleteDialog from "./DeleteDialog";

type TDeleteWorkspaceButtonProps = {
  workspaceName: string;
  isProcessing: boolean;
  handleClick: () => void;
};

const DeleteWorkspaceButton: React.FC<TDeleteWorkspaceButtonProps> = ({
  workspaceName,
  isProcessing,
  handleClick,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Stack
        spacing={1}
        alignItems="center"
        onClick={() => setDialogOpen(true)}
      >
        {isProcessing ? <LoadingIcon /> : <DeleteOutline />}
        <WorkspaceTitle>Delete Workspace</WorkspaceTitle>
      </Stack>
      <DeleteDialog
        workspaceName={workspaceName}
        isOpen={isDialogOpen}
        handleYes={() => {
          setDialogOpen(false);
          handleClick();
        }}
        handleClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default DeleteWorkspaceButton;
