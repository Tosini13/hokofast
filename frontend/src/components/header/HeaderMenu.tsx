import { AccountCircle } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import MenuIcon from "../../resources/svg/menu-icon.svg";

const MenuIconButton = styled(IconButton)`
  background-color: white;
  border-radius: 5px;
  height: 35px;
  width: 35px;
`;

type THeaderMenuProps = {};

const HeaderMenu: React.FC<THeaderMenuProps> = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <MenuIconButton>
        <img src={MenuIcon} alt="MenuIcon" />
      </MenuIconButton>
      <IconButton>
        <AccountCircle fontSize="large" style={{ color: "#313D56" }} />
      </IconButton>
    </Stack>
  );
};

export default HeaderMenu;
