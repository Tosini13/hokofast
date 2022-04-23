import { useController, UseControllerProps } from "react-hook-form";
import {
  Stack,
  styled,
  TextField as TextFieldMui,
  TextFieldProps,
  Typography,
} from "@mui/material";

export const TextFieldStyled = styled(TextFieldMui)`
  .MuiInput-root::before {
    display: none;
  }
  .MuiInput-root::after {
    display: none;
  }
`;

const TextFieldPrimaryStyled = styled(TextFieldStyled)`
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
  padding: 2px 8px;
`;

export type TTextFieldProps<FormValues> = Omit<TextFieldProps, "name"> &
  UseControllerProps<FormValues>;

export const TextField = <FormValues extends {}>({
  children,
  name,
  defaultValue,
  control,
  rules,
  label,
  ...props
}: TTextFieldProps<FormValues>) => {
  const {
    field: { ref, ...inputProps },
  } = useController<FormValues>({
    name,
    control,
    rules,
  });
  return (
    <Stack spacing={1}>
      <Typography color={"primary"} fontWeight={600}>
        {label}
      </Typography>
      <TextFieldPrimaryStyled
        inputRef={ref}
        variant="standard"
        {...inputProps}
        {...props}
      >
        {children}
      </TextFieldPrimaryStyled>
    </Stack>
  );
};

export default TextField;
