import { Stack, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import Workspace from "../components/workspaces/workspace/Workspace";
import { useWorkspacesService } from "../services/workspaces/workspaces-service";
import { Id } from "../types/utils";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 274px;
  padding-bottom: 65px;
`;

type TWorkspacePageProps = {};

const WorkspacePage: React.FC<TWorkspacePageProps> = () => {
  const params = useParams<{ workspaceId: Id }>();
  const { workspaces } = useWorkspacesService();
  const workspace = workspaces.find(
    (workspace) => workspace.id === params.workspaceId
  );

  if (!workspace) {
    return <Loading />;
  }

  return (
    <MainStack>
      <MainHeader />
      <StackContainer spacing={3}>
        <Workspace workspace={workspace} />
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
};

export default WorkspacePage;
