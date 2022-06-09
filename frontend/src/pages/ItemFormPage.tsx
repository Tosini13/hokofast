import { Stack, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import ListFormHeader from "../components/header/ListFormHeader";
import ItemForm from "../components/items/form/ItemForm";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import { useWorkspacesService } from "../services/workspaces/workspaces-service";
import { Id } from "../types/utils";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 51px;
  padding-bottom: 65px;
`;

type TItemFormPageProps = {};

const ItemFormPage: React.FC<TItemFormPageProps> = () => {
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
      <ListFormHeader />
      <StackContainer spacing={3}>
        <Stack>
          <ItemForm workspace={workspace} />
        </Stack>
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
};

export default ItemFormPage;
