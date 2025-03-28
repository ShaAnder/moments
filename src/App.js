/// IMPORTS ///

//data / imports
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefault";

//components
import css from "./App.module.css";
import NavBar from "./components/NavBar";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import PostCreateForm from "./pages/posts/postCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/currentUserContexts";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={css.App}>
      <NavBar />
      <Container className={css.Main}>
        <Routes>
          <Route
            path="/"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            path="/feed"
            element={
              <PostsPage message="No results found. Adjust the search keyword or follow a user" />
            }
          />
          <Route
            path="/liked"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or like a post"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id?" element={<PostPage />}></Route>
          {/* Catch page not found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
