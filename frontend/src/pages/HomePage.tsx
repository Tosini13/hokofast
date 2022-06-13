import { Button, Stack, styled } from "@mui/material";
import { observer } from "mobx-react";
import { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/header/HomeHeader";
import MainHeader from "../components/header/MainHeader";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import WorkspacesList from "../components/workspaces/list/WorkspacesList";
import { EPath } from "../routing/paths";
import { useUsersService } from "../services/users/users.service";
import { useWorkspacesService } from "../services/workspaces/workspaces-service";
import { AuthStoreContext } from "../stores/authStore";

const StackContainer = styled(Stack)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-bottom: 65px;
`;

type THomePageProps = {};

const HomePage: React.FC<THomePageProps> = observer(() => {
  const navigate = useNavigate();
  const authStore = useContext(AuthStoreContext);
  const { users } = useUsersService({});
  const { workspaces, isProcessing } = useWorkspacesService();
  console.log("workspaces", workspaces);

  const headerContent = useMemo(
    () => (
      <HomeHeader
        nickname={users?.find((user) => user.id === authStore.userId)?.nickname}
      />
    ),
    [users, authStore.userId]
  );

  const goToAddWorkspace = useCallback(
    () => navigate(EPath.addWorkspace),
    [navigate]
  );

  return (
    <MainStack>
      <MainHeader content={headerContent} />
      <StackContainer spacing={3}>
        {isProcessing ? (
          <Loading />
        ) : (
          <WorkspacesList workspaces={workspaces} />
        )}
        <Button onClick={goToAddWorkspace}>Add workspace</Button>
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
});

export default HomePage;
