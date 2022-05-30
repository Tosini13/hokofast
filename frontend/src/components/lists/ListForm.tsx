import { Button, Stack, useTheme } from "@mui/material";
import TextField from "../controlled/TextField";
import { useListForm } from "./form/useListForm";
import { Send } from "@mui/icons-material";
import { LoadingIcon } from "../utils/Loading";

type TListFormProps = {};

const ListForm: React.FC<TListFormProps> = () => {
  const { handleSubmit, control, isProcessing } = useListForm();

  const theme = useTheme();
  return (
    <form
      style={{
        flexGrow: 1,
        padding: "20px",
        backgroundColor: "#F2F2F2",
      }}
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={2}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <TextField
          name="name"
          placeholder={"List name"}
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

export default ListForm;
