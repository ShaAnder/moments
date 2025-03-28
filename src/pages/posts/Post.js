/// IMPORTS ///

// Data / API / Hooks / Context
import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/currentUserContexts";
import { axiosRes } from "../../api/axiosDefault";

// Media / CSS
import css from "../../css/Post.module.css";

// Components
import { Card, OverlayTrigger, Tooltip, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";

const Post = (props) => {
  // Destructure props for easy access
  const {
    id,
    owner,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image_url,
    updated_at,
    postPage,
    setPosts,
  } = props;

  // Get current user and location
  const currentUser = useCurrentUser();
  const location = useLocation();
  const is_owner = currentUser?.username === owner;

  // handle liking posts
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // handle unliking posts
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={css.Post}>
      <Card.Body>
        {/* Post header with profile avatar and timestamp */}
        <div className="d-flex align-items-center justify-content-between">
          <Nav.Link
            as={Link}
            to={`/profiles/${currentUser?.profile_id}`}
            className={`${css.NavLink} ${location.pathname === "/posts/create"}`}
          >
            <Avatar
              src={currentUser?.profile_image}
              text={currentUser?.username}
              height={40}
            />
          </Nav.Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && <span className="ms-2">...</span>}
          </div>
        </div>
      </Card.Body>

      {/* Post image with link to full post */}
      <Link to={`/posts/${id}`}>
        <Card.Img src={image_url} alt={title} />
      </Link>

      <Card.Body>
        {/* Post title and content */}
        {title && <Card.Title className="text-left">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}

        {/* Post actions: Like, comment, and tooltip interactions */}
        <div className={css.PostBar}>
          {is_owner ? (
            // Show tooltip when trying to like own post
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <span>
                <Icon name="heart" />
              </span>
            </OverlayTrigger>
          ) : like_id ? (
            // Show filled heart icon if post is liked
            <span onClick={handleUnlike}>
              <Icon name="heart-fill" className={css.Heart} />
            </span>
          ) : currentUser ? (
            // Show outlined heart if post is not liked
            <span onClick={handleLike}>
              <Icon name="heart" className={css.HeartOutline} />
            </span>
          ) : (
            // Show tooltip when not logged in
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <span>
                <Icon name="heart" />
              </span>
            </OverlayTrigger>
          )}
          {/* Display like count */}
          {likes_count}

          {/* Link to post comments */}
          <Link to={`/posts/${id}`}>
            <Icon name="chat-left" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
