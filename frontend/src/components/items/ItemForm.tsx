import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

type TItemFormProps = {
  handleSubmit: (name: string) => void;
};

const ItemForm: React.FC<TItemFormProps> = ({ handleSubmit }) => {
  const [name, setName] = useState<string>("");
  return (
    <form onSubmit={() => handleSubmit(name)}>
      <Stack>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          label="name"
        />
        <Button>Add</Button>
      </Stack>
    </form>
  );
};

export default ItemForm;
