import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh");
        // if user logged in, the code runs
        navigate("/");
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          navigate("/");
        }
      }
    };
    handleMount();
  }, [navigate, userAuthStatus]);
};
