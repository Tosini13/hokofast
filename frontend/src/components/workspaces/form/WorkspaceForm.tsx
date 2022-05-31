import { Send } from "@mui/icons-material";
import { Button, Stack, useTheme } from "@mui/material";
import TextField from "../../controlled/TextField";
import { LoadingIcon } from "../../utils/Loading";
import { useWorkspaceForm } from "./useWorkspaceForm";

type TWorkspaceFormProps = {};

const WorkspaceForm: React.FC<TWorkspaceFormProps> = () => {
  const { handleSubmit, control, isProcessing } = useWorkspaceForm();
  const theme = useTheme();
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <TextField
          name="name"
          placeholder={"Workspace name"}
          control={control}
          style={{ textAlign: "center", alignSelf: "center" }}
        />

        <TextField
          name="name"
          placeholder={"Workspace name"}
          control={control}
          style={{ textAlign: "center", alignSelf: "center" }}
        />

        <Button
          color="secondary"
          variant="contained"
          type="submit"
          style={{ alignSelf: "center" }}
          startIcon={
            isProcessing ? (
              <LoadingIcon
                color="secondary"
                customColor={theme.palette.primary.contrastText}
              />
            ) : (
              <Send />
            )
          }
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default WorkspaceForm;
