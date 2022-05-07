import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// we dont need to use the useContext all the info is avialabel in the useAuth0
// in this case use use the useContext and wrapped te applicaion
const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);
  // setup the useEffect so we can see the values
  useEffect(() => {
    if (isAuthenticated) {
      // if isAuthenticated true setMyUser to wherever user I get from the Auth0
      setMyUser(user);
    }
    // if the user logout dont want to keep my user as the object
    else {
      setMyUser(false);
    }
    // if isAuthenticated changing
  }, [isAuthenticated]);
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
