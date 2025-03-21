/**
 * Context file for setting the current user
 */

/// IMPORTS ///
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

/// CONTEXT ///

// user context, so we avoid passing it down every level
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// custome context hook exports
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // we want to get the currently logged in user for validation
  const [currentUser, setCurrentUser] = useState(null);

  // request to our api to retrieve logged in user
  const handleMount = async () => {
    try {
      const { data } = await axios.get(
        "https://moments-api-shaander-19059c743c88.herokuapp.com/dj-rest-auth/user/",
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Use effect to call our mount
  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
