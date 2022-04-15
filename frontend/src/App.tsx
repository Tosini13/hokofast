import { Stack, styled } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/MainHeader";
import List from "./components/lists/List/List";
import Lists from "./components/lists/Lists";
import BottomNav from "./components/navigation/BottomNavigation";
import { EPath } from "./routing/paths";

const StackContainer = styled(Stack)`
  min-height: 100vh;
`;

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StackContainer>
        <MainHeader />
        <Routes>
          <Route path={EPath.home} element={<Lists />} />
          <Route path={EPath.list} element={<List />} />
        </Routes>
        {/*
        <ProductsList products={items ?? []} />
        <ProductForm /> */}
        <BottomNav />
      </StackContainer>
    </QueryClientProvider>
  );
}

export default App;
