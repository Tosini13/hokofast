import { Button, Stack, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { addList } from "../../services/lists/lists-service";
import { TextFieldStyled } from "../header/Search";

const StackContainer = styled(Stack)`
  background-color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 2px 10px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
  align-self: center;
`;

type TListFormProps = {};

const ListForm: React.FC<TListFormProps> = () => {
  const [name, setName] = useState("");

  const handleSubmit = useCallback(async () => addList({ name }), [name]);

  return (
    <form
      style={{ flexGrow: 1, padding: "20px", backgroundColor: "#F2F2F2" }}
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit();
      }}
    >
      <Stack spacing={2}>
        <StackContainer>
          <TextFieldStyled
            placeholder={"List name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
            style={{ textAlign: "center", alignSelf: "center" }}
          />
        </StackContainer>

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
