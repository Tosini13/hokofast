import { Box, Stack, styled } from "@mui/material";
import Hokofast from "../../resources/svg/hoko-background.svg";
import HokofastIcon from "../../resources/svg/hokofast_icon.svg";
import HokofastName from "../../resources/svg/hokofast.svg";

export const Background = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: url(${Hokofast});
  overflow-y: auto;
`;

type TLayoutAuthProps = {};

const LayoutAuth: React.FC<TLayoutAuthProps> = ({ children }) => {
  return (
    <Background>
      <Stack spacing={3} padding="20px 40px">
        {children}
      </Stack>
    </Background>
  );
};

export default LayoutAuth;

type TLogoAuthProps = {};

export const LogoAuth: React.FC<TLogoAuthProps> = () => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"center"}
      spacing={2}
    >
      <img
        src={HokofastIcon}
        alt="icon"
        style={{ height: "40px", marginTop: "-16px" }}
      />
      <img src={HokofastName} alt="name" style={{ height: "40px" }} />
    </Stack>
  );
};
