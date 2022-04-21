import { Button, ButtonProps, styled } from "@mui/material";

const ButtonStyled = styled(Button)`
  border-radius: 10px;
`;

type TButtonPrimaryProps = ButtonProps;

const ButtonPrimary: React.FC<TButtonPrimaryProps> = (props) => {
  return (
    <ButtonStyled color="primary" variant="contained" {...props}>
      {props.children}
    </ButtonStyled>
  );
};

export default ButtonPrimary;
