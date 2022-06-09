import { useContext, useMemo } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  styled,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { EPath, toPath } from "../../routing/paths";
import { Id } from "../../types/utils";
import { observer } from "mobx-react";
import { AuthStoreContext } from "../../stores/authStore";
import { useWorkspacesService } from "../../services/workspaces/workspaces-service";

const countNavValue = (workspaceId: Id) => (location: string) => {
  if (matchPath(location, EPath.colaboration)) {
    return 0;
  }
  if (matchPath(location, EPath.home)) {
    return 1;
  }
  if (matchPath(location, toPath.addItem(workspaceId))) {
    return 2;
  }
  return -1;
};

const useNavNavigate =
  (workspaceId: Id) => (navigate: (path: string) => void) => {
    return (value: number) => {
      switch (value) {
        case 0:
          return navigate(EPath.colaboration);
        case 2:
          return navigate(toPath.addItem(workspaceId));
        default:
          return navigate(EPath.home);
      }
    };
  };

const BoxStyled = styled(Box)`
  position: fixed;
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

const BottomNav: React.FC<TBottomNavProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const { workspaces, isProcessing } = useWorkspacesService();
  const userWorkspaceId = workspaces.find(
    (workspace) => workspace.author === authStore.userId
  )?.id;
  const params = useParams<{ workspaceId: Id }>();
  const navigate = useNavigate();
  const location = useLocation();
  const navNavigate = useNavNavigate(
    params.workspaceId ?? (userWorkspaceId as Id)
  )(navigate);

  const isAddItemActive = useMemo(
    () => !isProcessing && (params.workspaceId || userWorkspaceId),
    [isProcessing, params.workspaceId, userWorkspaceId]
  );

  /**
   * @todo can I use useMemo for function?
   */
  const getNavValue = useMemo(
    () => countNavValue(params.workspaceId as Id),
    [params.workspaceId]
  );

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
          label="Add Item"
          icon={<AddShoppingCartIcon />}
          disabled={!isAddItemActive}
        />
      </BottomNavigationStyled>
    </BoxStyled>
  );
});

export default BottomNav;
