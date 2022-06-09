import { Add } from "@mui/icons-material";
import { Button, Stack, styled } from "@mui/material";
import { Id } from "../../../types/utils";
import { useItemForm } from "./useItemFormLegacy";
import TextField from "../../controlled/TextField";
import { LoadingIcon } from "../../utils/Loading";

const StackContainer = styled(Stack)`
  padding: 5px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
`;

const inputStyle = {
  backgroundColor: "#eee",
  padding: "0px 4px",
  boxShadow: "none",
  margin: "0px",
};

export const ButtonStyled = styled(Button)`
  min-width: 45px;
  padding: 6px 6px;
`;

type TAddItemProps = {
  listId: Id;
};

const AddItem: React.FC<TAddItemProps> = ({ listId }) => {
  const { handleSubmit, control, isProcessing } = useItemForm(listId);

  return (
    <form style={{ alignSelf: "center" }} onSubmit={handleSubmit}>
      <StackContainer direction={"row"} spacing={1}>
        <Stack spacing={1}>
          <TextField
            name="name"
            placeholder={"Name"}
            control={control}
            style={inputStyle}
          />
          <TextField
            name="amount"
            placeholder={"Amount"}
            control={control}
            style={inputStyle}
          />
        </Stack>
        <ButtonStyled color="secondary" variant="contained" type="submit">
          {isProcessing ? <LoadingIcon mode="light" /> : <Add />}
        </ButtonStyled>
      </StackContainer>
    </form>
  );
};

export default AddItem;
