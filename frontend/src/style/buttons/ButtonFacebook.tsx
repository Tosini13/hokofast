import { styled, Theme, useTheme } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import ButtonPrimary from "./ButtonPrimary";

const ButtonFbStyled = styled(ButtonPrimary)<{ theme: Theme }>`
  background-color: ${(props) => props.theme.media.facebook.color};
  color: ${(props) => props.theme.media.facebook.contrastText};
`;

type TButtonFacebookProps = {};

const ButtonFacebook: React.FC<TButtonFacebookProps> = () => {
  const theme = useTheme();
  return (
    <ButtonFbStyled
      startIcon={<Facebook />}
      color="primary"
      theme={theme}
      disabled
    >
      Login with Facebook
    </ButtonFbStyled>
  );
};

export default ButtonFacebook;
