import MainStack from "../components/layout/MainStack";
import List from "../components/lists/List/List";
import ItemsHeader from "../components/header/ItemsHeader";
import BottomNav from "../components/navigation/BottomNavigation";

type TListPageProps = {};

const ListPage: React.FC<TListPageProps> = () => {
  return (
    <MainStack>
      <ItemsHeader />
      <List />
      <BottomNav />
    </MainStack>
  );
};

export default ListPage;
