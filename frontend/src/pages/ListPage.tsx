import MainStack from "../components/layout/MainStack";
import List from "../components/lists/List/List";
import ItemsHeader from "../components/header/ItemsHeader";
import BottomNav from "../components/navigation/BottomNavigation";
import { useState } from "react";

type TListPageProps = {};

const ListPage: React.FC<TListPageProps> = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <MainStack>
      <ItemsHeader isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
      <List isLower={isFormOpen} />
      <BottomNav />
    </MainStack>
  );
};

export default ListPage;
