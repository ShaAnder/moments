/// IMPORTS ///

//data / imports
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefault";

//components
import css from "./App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm.js";

function App() {
  // Our rendered components
  return (
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
  );
}

export default App;
