import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appCss from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

import Post from "./Post";

function PostPage() {
  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // State to store the post data, initialized with an empty results array
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    // useEffect runs this function when the component mounts or when `id` changes
    const handleMount = async () => {
      // Defines an async function to fetch post data when the component loads
      try {
        // Sends a request to fetch post data and extracts only the `data` field from the response
        const [{ data: post }] = await Promise.all([
          // Makes a GET request to retrieve the post with the specific `id` from the API
          axiosReq.get(`/posts/${id}`),
        ]);
        // Updates the `post` state with the fetched post, wrapping it in a `results` array
        setPost({ results: [post] });
        // Logs the fetched post data to the console for debugging
        console.log(post);
      } catch (err) {
        // Catches and logs any errors if the API request fails
        console.log(err);
      }
    };
    // Calls the `handleMount` function immediately when the component mounts or `id` changes
    handleMount();
  }, [id]); // Re-runs this effect whenever `id` changes

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
