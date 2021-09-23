import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../context/AuthContext";
import Loading from "./loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authCtx = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authCtx.loadingUser) {
          return <Loading />;
        } else if (authCtx.isLoggedIn) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
