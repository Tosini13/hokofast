import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  styled,
} from "@mui/material";
import { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const BoxStyled = styled(Box)`
  position: absolute;
  width: calc(100vw - 4px);
  bottom: 2px;
  left: 2px;
  border-radius: 12px;
`;

const BottomNavigationStyled = styled(BottomNavigation)`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
type TBottomNavProps = {};

const BottomNav: React.FC<TBottomNavProps> = () => {
  const [value, setValue] = useState(0);
  return (
    <BoxStyled>
      <BottomNavigationStyled
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Colaboration" icon={<GroupsIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Add List"
          icon={<AddShoppingCartIcon />}
        />
      </BottomNavigationStyled>
    </BoxStyled>
  );
};

export default BottomNav;
