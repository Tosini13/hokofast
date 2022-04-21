import { styled, Theme, useTheme } from "@mui/material";
import { Mail } from "@mui/icons-material";
import ButtonPrimary from "./ButtonPrimary";

const ButtonGoogleStyled = styled(ButtonPrimary)<{ theme: Theme }>`
  background-color: ${(props) => props.theme.media.google.color};
  color: ${(props) => props.theme.media.google.contrastText};
`;

type TButtonGoogleProps = {};

const ButtonGoogle: React.FC<TButtonGoogleProps> = () => {
  const theme = useTheme();
  return (
    <ButtonGoogleStyled
      startIcon={<Mail />}
      color="primary"
      theme={theme}
      disabled
    >
      Login with Google
    </ButtonGoogleStyled>
  );
};

export default ButtonGoogle;
