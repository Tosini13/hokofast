import { Stack, styled } from "@mui/material";
import MainHeader from "../components/header/MainHeader";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import WorkspaceForm from "../components/workspaces/form/WorkspaceForm";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 120px;
  padding-bottom: 65px;
`;

type TWorkspaceFormPageProps = {};

const WorkspaceFormPage: React.FC<TWorkspaceFormPageProps> = () => {
  return (
    <MainStack>
      <MainHeader />
      <StackContainer spacing={3}>
        <Stack>
          <WorkspaceForm />
        </Stack>
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
};

export default WorkspaceFormPage;
