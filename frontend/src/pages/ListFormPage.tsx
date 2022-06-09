import { Stack, styled } from "@mui/material";
import ListFormHeader from "../components/header/ListFormHeader";
import MainStack from "../components/layout/MainStack";
import ListForm from "../components/lists/ListForm";
import BottomNav from "../components/navigation/BottomNavigation";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 51px;
  padding-bottom: 65px;
`;

type TListFormPageProps = {};

const ListFormPage: React.FC<TListFormPageProps> = () => {
  return (
    <MainStack>
      <ListFormHeader />
      <StackContainer spacing={3}>
        <Stack>
          <ListForm />
        </Stack>
      </StackContainer>
      <BottomNav />
    </MainStack>
  );
};

export default ListFormPage;
