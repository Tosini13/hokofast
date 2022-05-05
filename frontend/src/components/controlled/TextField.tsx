import { useController, UseControllerProps } from "react-hook-form";
import {
  Stack,
  styled,
  TextField as TextFieldMui,
  TextFieldProps,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

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

const VisibilityIconStyled = styled(VisibilityIcon)`
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const VisibilityOffIconStyled = styled(VisibilityOffIcon)`
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

export type TTextFieldProps<FormValues> = Omit<TextFieldProps, "name"> &
  UseControllerProps<FormValues> & {
    visible?: boolean;
  };

export const TextField = <FormValues extends {}>({
  children,
  name,
  defaultValue,
  control,
  rules,
  label,
  type,
  ...props
}: TTextFieldProps<FormValues>) => {
  const [visible, setVisible] = useState(false);
  const {
    field: { ref, ...inputProps },
  } = useController<FormValues>({
    name,
    control,
    rules,
  });
  return (
    <Stack spacing={1} style={{ position: "relative" }}>
      <Typography color={"primary"} fontWeight={600}>
        {label}
      </Typography>
      <TextFieldPrimaryStyled
        inputRef={ref}
        variant="standard"
        type={visible ? "text" : type}
        {...inputProps}
        {...props}
      >
        {children}
      </TextFieldPrimaryStyled>
      {type === "password" ? (
        visible ? (
          <VisibilityOffIconStyled onClick={() => setVisible(false)} />
        ) : (
          <VisibilityIconStyled onClick={() => setVisible(true)} />
        )
      ) : null}
    </Stack>
  );
};

export default TextField;
