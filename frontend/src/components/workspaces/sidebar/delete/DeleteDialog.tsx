import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

type TDeleteDialogProps = {
  isOpen: boolean;
  workspaceName: string;
  handleClose: () => void;
  handleYes: () => void;
};

const DeleteDialog: React.FC<TDeleteDialogProps> = ({
  isOpen,
  workspaceName,
  handleClose,
  handleYes,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        Are you sure you want delete {workspaceName} ?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
