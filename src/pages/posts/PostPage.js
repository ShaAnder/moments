/// IMPORTS ///

// Data / API / Hooks / Context
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

// Media / CSS
import appCss from "../../App.module.css";

// Components
import { Col, Row, Container } from "react-bootstrap";
import Post from "./Post";

function PostPage() {
  // Get the 'id' parameter from the URL
  const { id } = useParams();

  // State to store post data, even if we get 1 or many posts
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    // Fetch post data when the component loads or 'id' changes
    const handleMount = async () => {
      try {
        // Get the post data using the 'id' and set the state
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]); // Rerun this effect if the 'id' changes

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appCss.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
