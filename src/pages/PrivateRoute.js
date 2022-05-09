import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";
// in order to collect those value with go with params
// and wherever is inside in the price route return
// rest operator is getting everything that we pass in the PrivateRoute
const PrivateRoute = ({ children, ...rest }) => {
  // console.log(children);
  // console.log(rest);
  // get the user from the auth0
  const { user } = useAuth0();
  // spread operator
  return (
    <Route
      {...rest}
      render={() => {
        // id user exist display children
        return user ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
