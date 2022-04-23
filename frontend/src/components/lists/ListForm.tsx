import { Button, Stack } from "@mui/material";
import TextField from "../controlled/TextField";
import { useListForm } from "./form/useListForm";

type TListFormProps = {};

const ListForm: React.FC<TListFormProps> = () => {
  const { handleSubmit, control } = useListForm();

  return (
    <form
      style={{ flexGrow: 1, padding: "20px", backgroundColor: "#F2F2F2" }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={2}>
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
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default ListForm;
