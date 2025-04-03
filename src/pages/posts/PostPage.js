/// IMPORTS ///

// Data / API / Hooks / Context
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/currentUserContexts";

// Media / CSS
import appCss from "../../App.module.css";

// Components
import { Col, Row, Container } from "react-bootstrap";
import Post from "./Post";
import CommentCreateForm from "../comment/commentCreateForm";
import Comment from "../comment/comment";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
  // Get the 'id' parameter from the URL
  const { id } = useParams();

  // State to store post data, even if we get 1 or many posts
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    // Fetch post data when the component loads or 'id' changes
    const handleMount = async () => {
      try {
        // Get the post data using the 'id' and set the state
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?posts=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        console.log(comments);
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
        <Container className={appCss.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                  profile_image={profile_image}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
