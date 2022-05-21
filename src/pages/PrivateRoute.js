import React from "react";
import { Navigate } from "react-router-dom";
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
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
