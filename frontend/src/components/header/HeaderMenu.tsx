import { IconButton, Stack, styled, Avatar } from "@mui/material";
import React, { useCallback, useContext, useMemo, useState } from "react";
import DefaultAvatar from "../../resources/svg/default_avatar.svg";
import { useNavigate } from "react-router-dom";
import { EPath } from "../../routing/paths";
import { AuthStoreContext } from "../../stores/authStore";
import Hamburger from "./Icons/Hamburger";
import Dialog, { DialogButton } from "../layout/Dialog";

const AvatarIconButton = styled(IconButton)`
  background-color: white;
  height: 35px;
  width: 35px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
`;

type THeaderMenuProps = {};

const HeaderMenu: React.FC<THeaderMenuProps> = () => {
  const authStore = useContext(AuthStoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const avatarUrl = useMemo(() => DefaultAvatar, []);

  const logOut = React.useCallback(
    () =>
      authStore.logOut({
        successCallBack: () => navigate(EPath.signIn),
      }),
    [navigate, authStore]
  );

  const handleClose = useCallback(() => setIsOpen(false), []);

  const dialogActions = useMemo(() => {
    if (authStore.isLoggedIn) {
      return [
        <DialogButton color="success" onClick={handleClose}>
          No
        </DialogButton>,
        <DialogButton color="error" onClick={logOut}>
          Log Out
        </DialogButton>,
      ];
    }
    return [
      <DialogButton onClick={() => navigate(EPath.signIn)}>
        Sign In
      </DialogButton>,
      <DialogButton onClick={() => navigate(EPath.signUp)}>
        Sign Up
      </DialogButton>,
    ];
  }, [authStore.isLoggedIn, logOut, handleClose, navigate]);

  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Hamburger />
      <AvatarIconButton size="large" onClick={() => setIsOpen(!isOpen)}>
        <Avatar alt="user's avatar" src={avatarUrl} />
      </AvatarIconButton>
      <Dialog
        open={isOpen}
        dialogActions={dialogActions}
        title={"Do you want to log out?"}
      />
    </Stack>
  );
};

export default HeaderMenu;
