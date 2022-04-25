import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  styled,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { EPath } from "../../routing/paths";

const getNavValue = (location: string) => {
  if (matchPath(location, EPath.colaboration)) {
    return 0;
  }
  if (matchPath(location, EPath.home)) {
    return 1;
  }
  if (matchPath(location, EPath.addList)) {
    return 2;
  }
  return -1;
};

const useNavNavigate = (navigate: (path: string) => void) => {
  return (value: number) => {
    switch (value) {
      case 0:
        return navigate(EPath.colaboration);
      case 2:
        return navigate(EPath.addList);
      default:
        return navigate(EPath.home);
    }
  };
};

const BoxStyled = styled(Box)`
  position: absolute;
  width: calc(100vw);
  bottom: 0px;
`;

const BottomNavigationStyled = styled(BottomNavigation)`
  border-radius: 12px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 40%);
`;
type TBottomNavProps = {};

const BottomNav: React.FC<TBottomNavProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navNavigate = useNavNavigate(navigate);

  return (
    <BoxStyled>
      <BottomNavigationStyled
        color="secondary"
        showLabels
        value={getNavValue(location.pathname)}
        onChange={(_event, newValue) => {
          navNavigate(newValue);
        }}
      >
        <BottomNavigationAction
          disabled
          label="Colaboration"
          icon={<GroupsIcon />}
        />
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
