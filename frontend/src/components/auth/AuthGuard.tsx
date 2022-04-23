import { observer } from "mobx-react";
import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { EPath } from "../../routing/paths";
import { AuthStoreContext } from "../../stores/authStore";
import Loading from "../utils/Loading";

type TAuthRedirectProps = {};

const AuthRedirect: React.FC<TAuthRedirectProps> = observer(({ children }) => {
  const authStore = useContext(AuthStoreContext);
  const location = useLocation();

  const nonAuthPaths = [EPath.signIn, EPath.signUp];

  authStore.check();

  if (authStore.isLoggedIn === undefined) {
    return <Loading />;
  }

  if (
    !authStore.isLoggedIn &&
    !nonAuthPaths.includes(location.pathname as EPath)
  ) {
    return <Navigate to={EPath.signIn} />;
  }
  if (
    authStore.isLoggedIn &&
    nonAuthPaths.includes(location.pathname as EPath)
  ) {
    return <Navigate to={EPath.home} />;
  }

  return <>{children}</>;
});

export default AuthRedirect;
