import { Stack, styled, TextFieldProps, Typography } from "@mui/material";
import { TextFieldStyled } from "../../components/header/Search";

const TextFieldAuthStyled = styled(TextFieldStyled)`
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
  padding: 2px 8px;
`;

type TTextFieldAuthProps = TextFieldProps;

const TextFieldAuth: React.FC<TTextFieldAuthProps> = ({ label, ...props }) => {
  return (
    <Stack spacing={1}>
      <Typography color={"primary"} fontWeight={600}>
        {label}
      </Typography>
      <TextFieldAuthStyled variant="standard" {...props} />
    </Stack>
  );
};

export default TextFieldAuth;
