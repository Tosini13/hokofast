import { Stack, styled, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useContext, useMemo, useState } from "react";
import HomeHeader from "../components/header/HomeHeader";
import MainHeader from "../components/header/MainHeader";
import ItemsList from "../components/items/ItemsList";
import MainStack from "../components/layout/MainStack";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import { useAllItemsService } from "../services/items/items-service";
import { useUsersService } from "../services/users/users.service";
import { useWorkspacesService } from "../services/workspaces/workspaces-service";
import { AuthStoreContext } from "../stores/authStore";
import { Id } from "../types/utils";

const StackContainer = styled(Stack)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-bottom: 65px;
`;

type THomePageProps = {};

const HomePage: React.FC<THomePageProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);
  const { users } = useUsersService({});
  const [category, setCategory] = useState<Id | null | undefined>();
  const { workspaces } = useWorkspacesService();

  const headerContent = useMemo(
    () => (
      <HomeHeader
        nickname={users?.find((user) => user.id === authStore.userId)?.nickname}
        setCategory={setCategory}
      />
    ),
    [users, authStore.userId]
  );

  return (
    <MainStack>
      <MainHeader content={headerContent} />
      <StackContainer spacing={3}>
        <HomePageMain
          workspacesId={workspaces.map((workspace) => workspace.id)}
          categoryId={category}
        />
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
});

export default HomePage;

type THomePageMainProps = { workspacesId: Id[]; categoryId?: Id | null };

const HomePageMain: React.FC<THomePageMainProps> = ({
  workspacesId,
  categoryId,
}) => {
  const { items, isProcessing } = useAllItemsService(
    workspacesId,
    categoryId ?? undefined
  );
  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : items ? (
        <ItemsList items={items} />
      ) : (
        <Typography>No Items</Typography>
      )}
    </>
  );
};
