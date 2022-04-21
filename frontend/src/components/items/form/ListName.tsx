import {
  Stack,
  TextField as TextFieldMui,
  TextFieldProps,
  Theme,
  useTheme,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useState } from "react";
import { editList } from "../../../services/lists/lists-service";
import { Id } from "../../../types/utils";

const StackInputContainer = styled(Stack)<{ isactive: boolean }>`
  padding: 5px;
  align-self: center;
  input {
    text-align: center;
  }
  transition: all 0.3s;
  ${(props) =>
    props.isactive
      ? `
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
  `
      : `
  background-color: transparent;
  `}
`;

const ButtonStyled = styled(Button)<{ isactive: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  transition: all 0.3s;
  ${(props) =>
    props.isactive
      ? `
      top: 80vh;
  `
      : `
      top: calc(100vh + 40px);
  `}
`;

const TextFieldStyled = styled(TextFieldMui)<{
  isactive: boolean;
  theme: Theme;
}>`
  .MuiInput-root::before {
    display: none;
  }
  .MuiInput-root::after {
    display: none;
  }
  transition: all 0.3s;
  ${(props) =>
    props.isactive
      ? ``
      : `
    .Mui-disabled.MuiInput-input{
      color: ${props.theme.palette.primary.main};
      -webkit-text-fill-color: ${props.theme.palette.primary.main};
      font-size: 18px;
      font-weight: 600;
    }
  `}
`;

type TTextFieldWithThemeProps = TextFieldProps & {
  isActive: boolean;
};

const TextFieldWithTheme: React.FC<TTextFieldWithThemeProps> = ({
  isActive,
  ...props
}) => {
  const theme = useTheme();
  return <TextFieldStyled {...props} isactive={isActive} theme={theme} />;
};

type TListNameProps = { listId: Id; name: string; isActive: boolean };

const ListName: React.FC<TListNameProps> = ({
  name: initName,
  isActive,
  listId,
}) => {
  const [name, setName] = useState(initName);

  const handleSubmit = useCallback(async () => {
    await editList(listId, {
      name,
    });
  }, [name, listId]);

  return (
    <form
      style={{ alignSelf: "center" }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <StackInputContainer isactive={isActive}>
        <TextFieldWithTheme
          placeholder={"List name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          isActive={isActive}
          disabled={!isActive}
        />
      </StackInputContainer>
      <ButtonStyled
        color="secondary"
        variant="contained"
        type="submit"
        isactive={isActive}
      >
        Save
      </ButtonStyled>
    </form>
  );
};

export default ListName;
