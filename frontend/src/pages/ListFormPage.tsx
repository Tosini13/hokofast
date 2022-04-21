import ListFormHeader from "../components/header/ListFormHeader";
import MainStack from "../components/layout/MainStack";
import ListForm from "../components/lists/ListForm";
import BottomNav from "../components/navigation/BottomNavigation";

type TListFormPageProps = {};

const ListFormPage: React.FC<TListFormPageProps> = () => {
  return (
    <MainStack>
      <ListFormHeader />
      <ListForm />
      <BottomNav />
    </MainStack>
  );
};

export default ListFormPage;
