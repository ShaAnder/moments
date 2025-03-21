/// IMPORTS ///

//data / imports
import { createContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./api/axiosDefault";

//components
import css from "./App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

// user context, so we avoid passing it down every level
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
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

  // Our rendered components
  return (
    // user context provider, wraps around relevant code so it all has access to context
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={css.App}>
          <NavBar />
          <Container className={css.Main}>
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              {/* Catch page not found */}
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
