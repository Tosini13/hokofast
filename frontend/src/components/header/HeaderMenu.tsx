import { IconButton, Stack, styled, Avatar } from "@mui/material";
import { useMemo } from "react";
import MenuIcon from "../../resources/svg/menu-icon.svg";
import DefaultAvatar from "../../resources/svg/default_avatar.svg";

const MenuIconButton = styled(IconButton)`
  background-color: white;
  border-radius: 5px;
  height: 35px;
  width: 35px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
`;

const AvatarIconButton = styled(IconButton)`
  background-color: white;
  height: 35px;
  width: 35px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
`;

type THeaderMenuProps = {};

const HeaderMenu: React.FC<THeaderMenuProps> = () => {
  const avatarUrl = useMemo(() => DefaultAvatar, []);
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <MenuIconButton color="primary">
        <img
          src={MenuIcon}
          alt="MenuIcon"
          style={{
            filter:
              "invert(21%) sepia(11%) saturate(1939%) hue-rotate(183deg) brightness(93%) contrast(88%)",
          }}
        />
      </MenuIconButton>
      <AvatarIconButton size="large">
        <Avatar alt="user's avatar" src={avatarUrl} />
      </AvatarIconButton>
    </Stack>
  );
};

export default HeaderMenu;
