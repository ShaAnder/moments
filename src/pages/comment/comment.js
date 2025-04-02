import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import css from "../../css/Comment.module.css";
import { useCurrentUser } from "../../contexts/currentUserContexts";
import { axiosRes } from "../../api/axiosDefault";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);

      // Ensure state updates properly
      if (setPost) {
        setPost((prevPost) => ({
          ...prevPost,
          results: prevPost.results.map((post, index) =>
            index === 0
              ? { ...post, comments_count: post.comments_count - 1 }
              : post
          ),
        }));
      }

      if (setComments) {
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div>
      <hr />
      <div className="d-flex align-items-center">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="ml-2">
          <span className={css.Owner}>{owner}</span>
          <span className={css.Date}>{updated_at}</span>
          <p>{content}</p>
        </div>
        {is_owner && (
          <div className="ms-auto">
            <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
