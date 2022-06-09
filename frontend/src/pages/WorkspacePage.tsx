import { Stack, styled } from "@mui/material";
import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import WorkspaceHeader from "../components/header/WorkspaceHeader";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import Workspace from "../components/workspaces/workspace/Workspace";
import { useWorkspacesService } from "../services/workspaces/workspaces-service";
import { AuthStoreContext } from "../stores/authStore";
import { Id } from "../types/utils";

const StackContainer = styled(Stack)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-bottom: 65px;
`;

type TWorkspacePageProps = {};

const WorkspacePage: React.FC<TWorkspacePageProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const params = useParams<{ workspaceId: Id }>();
  const { workspaces } = useWorkspacesService();

  const workspace = workspaces.find((workspace) =>
    params.workspaceId
      ? workspace.id === params.workspaceId
      : workspace.author === authStore.userId
  );

  const headerContent = useMemo(
    () => <WorkspaceHeader workspaceName={workspace?.name} />,
    [workspace]
  );

  if (!workspace) {
    return <Loading />;
  }

  return (
    <MainStack>
      <MainHeader content={headerContent} />
      <StackContainer spacing={3}>
        <Workspace workspace={workspace} />
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
});

export default WorkspacePage;
