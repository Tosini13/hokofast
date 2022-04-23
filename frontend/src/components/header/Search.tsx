import { SearchSharp } from "@mui/icons-material";
import { IconButton, Stack, styled, TextFieldProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { TextFieldStyled } from "../controlled/TextField";

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

export type TSearchProps<FormValues> = Omit<TextFieldProps, "name"> &
  UseControllerProps<FormValues>;

const Search = <FormValues extends {}>({
  children,
  name,
  defaultValue,
  control,
  rules,
  ...props
}: TSearchProps<FormValues>) => {
  const {
    field: { ref, ...inputProps },
  } = useController<FormValues>({
    name,
    control,
    rules,
  });
  return (
    <StackContainer direction={"row"} alignItems="center" spacing={1}>
      <IconButton>
        <SearchSharp />
      </IconButton>
      <TextFieldStyled
        inputRef={ref}
        variant="standard"
        {...inputProps}
        {...props}
      >
        {children}
      </TextFieldStyled>
    </StackContainer>
  );
};

export default Search;
