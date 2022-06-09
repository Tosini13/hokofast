import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import AuthRedirect from "./components/auth/AuthGuard";
import HomePage from "./pages/HomePage";
import ItemFormPage from "./pages/ItemFormPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WorkspaceFormPage from "./pages/WorkspaceFormPage";
import WorkspacePage from "./pages/WorkspacePage";
import { EPath } from "./routing/paths";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthRedirect>
        <Routes>
          <Route path={EPath.home} element={<HomePage />} />
          <Route path={EPath.addItem} element={<ItemFormPage />} />
          <Route path={EPath.addWorkspace} element={<WorkspaceFormPage />} />
          <Route path={EPath.workspace} element={<WorkspacePage />} />
          <Route path={EPath.signIn} element={<SignInPage />} />
          <Route path={EPath.signUp} element={<SignUpPage />} />
        </Routes>
      </AuthRedirect>
    </QueryClientProvider>
  );
}

export default App;
