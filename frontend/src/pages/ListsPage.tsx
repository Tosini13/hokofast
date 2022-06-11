import { Stack, styled } from "@mui/material";
import { useMemo } from "react";
import MainHeader from "../components/header/MainHeader";
import DividerTitle from "../components/layout/DividerTitle";
import MainStack from "../components/layout/MainStack";
import Lists from "../components/lists/Lists";
import BottomNav from "../components/navigation/BottomNavigation";
import Loading from "../components/utils/Loading";
import { useListsService } from "../services/lists/lists-service";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 274px;
  padding-bottom: 65px;
`;

type TListsPageProps = {};

const ListsPage: React.FC<TListsPageProps> = () => {
  const { myLists, guestLists } = useListsService();

  const headerContent = useMemo(() => <p>No Header</p>, []);

  return (
    <MainStack>
      <MainHeader content={headerContent} />
      <StackContainer spacing={3}>
        <DividerTitle>My Lists</DividerTitle>
        {myLists ? <Lists lists={myLists} /> : <Loading />}
        <DividerTitle>Friends Lists</DividerTitle>
        {guestLists ? <Lists lists={guestLists} /> : <Loading />}
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
};

export default ListsPage;
