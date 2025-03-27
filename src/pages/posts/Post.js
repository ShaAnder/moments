// Import the React library which is necessary to define React components.
import React from "react";
import css from "../../css/Post.module.css";
import { useCurrentUser } from "../../contexts/currentUserContexts";
import { Card, OverlayTrigger, Tooltip, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";

import Icon from "../../components/Icon";

// Define the Post component as a functional component that accepts props.
const Post = (props) => {
  // Destructure the props object to extract individual properties for easier use.
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
  } = props;

  // Use the custom hook to get the current user object.
  const currentUser = useCurrentUser();

  //use location hook, from react router to allow navigating
  const location = useLocation();

  // Determine if the current user is the owner of the post.
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={css.Post}>
      <Card.Body>
        {/* Replacing Media with Bootstrap's flex utilities */}
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

      <Link to={`/posts/${id}`}>
        <Card.Img src={image_url} alt={title} />
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-left">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}

        <div className={css.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <Icon name="heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <Icon name="heart" className={css.Heart} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <Icon name="heart" className={css.HeartOutline} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <Icon name="heart" />
            </OverlayTrigger>
          )}
          {likes_count}

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
