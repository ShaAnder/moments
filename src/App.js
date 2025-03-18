import css from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={css.App}>
      <NavBar />
      <Container className={css.Main}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/signin" element={<h1>Signin</h1>} />
          <Route path="/signup" element={<h1>Signup</h1>} />
          {/* Catch page not found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
