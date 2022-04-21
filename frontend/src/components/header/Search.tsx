import { SearchSharp } from "@mui/icons-material";
import { IconButton, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";

const StackContainer = styled(Stack)`
  background-color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 2px 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
`;

export const TextFieldStyled = styled(TextField)`
  .MuiInput-root::before {
    display: none;
  }
  .MuiInput-root::after {
    display: none;
  }
`;

type TSearchProps = {
  placeholder: string;
};

const Search: React.FC<TSearchProps> = ({ placeholder }) => {
  const [find, setFind] = useState("");
  return (
    <StackContainer direction={"row"} alignItems="center" spacing={1}>
      <IconButton>
        <SearchSharp />
      </IconButton>
      <TextFieldStyled
        placeholder={placeholder}
        value={find}
        onChange={(e) => setFind(e.target.value)}
        variant="standard"
      />
    </StackContainer>
  );
};

export default Search;
