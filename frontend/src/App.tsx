import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import ListFormPage from "./pages/ListFormPage";
import ListPage from "./pages/ListPage";
import ListsPage from "./pages/ListsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { EPath } from "./routing/paths";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={EPath.list} element={<ListPage />} />
        <Route path={EPath.home} element={<ListsPage />} />
        <Route path={EPath.addList} element={<ListFormPage />} />
        <Route path={EPath.signIn} element={<SignInPage />} />
        <Route path={EPath.signUp} element={<SignUpPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
