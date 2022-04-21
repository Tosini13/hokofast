import { useCallback, useState } from "react";
import { Add } from "@mui/icons-material";
import { Button, Stack, styled, TextField } from "@mui/material";
import { createItem } from "../../../services/items/item-service";
import { Id } from "../../../types/utils";

const StackContainer = styled(Stack)`
  padding: 5px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
`;

const TextFieldStyled = styled(TextField)`
  background-color: #eee;
  border-radius: 5px;
  padding: 0px 4px;

  .MuiInput-root::before {
    display: none;
  }
  .MuiInput-root::after {
    display: none;
  }
`;

export const ButtonStyled = styled(Button)`
  min-width: 45px;
  padding: 6px 6px;
`;

type TAddItemProps = {
  listId: Id;
};

const AddItem: React.FC<TAddItemProps> = ({ listId }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = useCallback(
    (name: string) => {
      createItem(listId, { name });
    },
    [listId]
  );

  return (
    <form
      style={{ alignSelf: "center" }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(name);
      }}
    >
      <StackContainer direction={"row"} spacing={1}>
        <Stack spacing={1}>
          <TextFieldStyled
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
            placeholder="Product name"
          />
          <TextFieldStyled
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="standard"
            placeholder="Amount"
          />
        </Stack>
        <ButtonStyled color="secondary" variant="contained" type="submit">
          <Add />
        </ButtonStyled>
      </StackContainer>
    </form>
  );
};

export default AddItem;
