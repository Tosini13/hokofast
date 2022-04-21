import MainHeader from "../components/header/MainHeader";
import MainStack from "../components/layout/MainStack";
import Lists from "../components/lists/Lists";
import BottomNav from "../components/navigation/BottomNavigation";

type TListsPageProps = {};

const ListsPage: React.FC<TListsPageProps> = () => {
  return (
    <MainStack>
      <MainHeader />
      <Lists />
      <BottomNav />
    </MainStack>
  );
};

export default ListsPage;
