/**
 * Context file for setting the current user
 */

/// IMPORTS ///
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";

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

  // navigate to redirect as needed
  const navigate = useNavigate();

  // request to our api to retrieve logged in user
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      if (err.response?.status === 401) {
        return;
      } else {
        console.error(err);
      }
    }
  };

  // Use effect to call our mount
  useEffect(() => {
    handleMount();
  }, []);

  // useMemo hook to attach our interceptors
  useMemo(() => {
    // setup our interceptor configured to
    axiosReq.interceptors.request.use(
      async (config) => {
        // try refresh the token
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          // unless there's an error
        } catch (err) {
          // in which case, the logged in user is redirected to signin
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate("/signin");
            }
            // and set the data to null (aka no data log in again)
            return null;
          });
          // return our config
          return config;
        }
        return config;
      },
      // return rejected promise
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        // check to see if the error is 401
        if (err.response?.status === 401) {
          // try refresh the token
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            // unless there's an error
          } catch (err) {
            // in which case, the logged in user is redirected to signin
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              // and set the data to null (aka no data log in again)
              return null;
            });
          }
          // return the error config to exit the interceptor
          return axios(err.config);
        }
        // if error not 401 reject the promise with the error
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  // Proactive refresh using a "ping" approach that doesn't require token decoding.
  useEffect(() => {
    const interval = setInterval(
      async () => {
        console.log("Pinging refresh endpoint to keep session alive...");
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          console.log("Token refreshed via ping");
        } catch (err) {
          console.error("Error refreshing token via ping:", err);
          setCurrentUser(null);
          navigate("/signin");
        }
      },
      4 * 60 * 1000
    ); // every 4 minutes
    return () => clearInterval(interval);
  }, [navigate, setCurrentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
