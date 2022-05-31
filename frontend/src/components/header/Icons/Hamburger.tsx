import { IconButton, styled } from "@mui/material";
import { useState } from "react";
import MenuIcon from "../../../resources/svg/menu-icon.svg";
import DrawerNavigation from "../../navigation/DrawerNavigation";

const MenuIconButton = styled(IconButton)`
  background-color: white;
  border-radius: 5px;
  height: 35px;
  width: 35px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 40%);
`;

type THamburgerProps = {};

const Hamburger: React.FC<THamburgerProps> = () => {
  console.log("hamburger");
  const [isDrawerOpen, setIsDraweOpen] = useState(false);
  console.log("isDrawerOpen", isDrawerOpen);
  return (
    <>
      <MenuIconButton
        color="primary"
        onClick={() => {
          console.log("CLIC");
          setIsDraweOpen((open) => !open);
        }}
      >
        <img
          src={MenuIcon}
          alt="MenuIcon"
          style={{
            filter:
              "invert(21%) sepia(11%) saturate(1939%) hue-rotate(183deg) brightness(93%) contrast(88%)",
          }}
        />
      </MenuIconButton>
      <DrawerNavigation
        isOpen={isDrawerOpen}
        onClose={() => setIsDraweOpen(false)}
      />
    </>
  );
};

export default Hamburger;
