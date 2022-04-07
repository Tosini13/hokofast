import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import List from "./components/lists/List/List";
import Lists from "./components/lists/Lists";
import BottomNav from "./components/navigation/BottomNavigation";
import { EPath } from "./routing/paths";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path={EPath.home} element={<Lists />} />
          <Route path={EPath.list} element={<List />} />
        </Routes>
        {/*
        <ProductsList products={items ?? []} />
        <ProductForm /> */}
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}

export default App;
