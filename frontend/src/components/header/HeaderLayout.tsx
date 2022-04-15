import { Box, styled } from "@mui/material";
import Hokofast from "../../resources/svg/hoko-background.svg";

const HeaderBackground = styled(Box)`
  width: 100%;
  height: fit-content;
  padding-bottom: 90px;
  background: url(${Hokofast});
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 102%;
    height: 50px;
    background-color: #f2f2f2;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
    box-shadow: inset 0px 5px 6px 0px rgb(0 0 0 / 20%);
    transform: translateX(-50%);
  }
`;

type THeaderLayoutProps = {};

const HeaderLayout: React.FC<THeaderLayoutProps> = ({ children }) => {
  return (
    <HeaderBackground>
      <div style={{ padding: "0px 20px", paddingTop: "20px" }}>{children}</div>
    </HeaderBackground>
  );
};

export default HeaderLayout;
