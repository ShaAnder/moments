/// IMPORTS ///

// Data / API / Hooks / Context
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";

/// CONTEXT ///

// user context for accessing current user globally
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// custom hooks to use current user and setter
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // state for storing the current user
  const [currentUser, setCurrentUser] = useState(null);

  // navigate hook to handle redirection
  const navigate = useNavigate();

  // fetch current user data on mount
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      if (err.response?.status === 401) return; // no user logged in
      console.error(err);
    }
  };

  // fetch user data on component mount
  useEffect(() => {
    handleMount();
  }, []);

  // setup interceptors for token refresh
  useMemo(() => {
    // request interceptor to refresh token before making requests
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          // if token refresh fails, log user out and redirect
          setCurrentUser(null);
          navigate("/signin");
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // response interceptor to refresh token if response is 401
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // if refresh fails, log user out
            setCurrentUser(null);
            navigate("/signin");
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  // proactive token refresh to keep session alive
  useEffect(() => {
    const interval = setInterval(
      async () => {
        console.log("Pinging refresh endpoint...");
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          console.log("Token refreshed via ping");
        } catch (err) {
          console.error("Error refreshing token:", err);
          setCurrentUser(null);
          navigate("/signin");
        }
      },
      4 * 60 * 1000
    ); // every 4 minutes

    return () => clearInterval(interval); // clean up on unmount
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
