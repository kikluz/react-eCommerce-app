import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// we dont need to use the useContext all the info is avialabel in the useAuth0
// in this case use use the useContext and wrapped te applicaion
const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [myUser, setMyUser] = useState(null);
  // setup the useEffect so we can see the values
  useEffect(() => {
    // set user that is comming from the auth 0
    setMyUser(user);
    // running everytime users changes
  }, [user]);
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
