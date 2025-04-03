import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import css from "../../css/Comment.module.css";
import { useCurrentUser } from "../../contexts/currentUserContexts";
import { axiosRes } from "../../api/axiosDefault";
import CommentEditForm from "./commentEditForm";

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

  const [showEditForm, setShowEditForm] = useState(false);

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
    <div className="d-flex justify-content-between align-items-center">
      {/* Left side */}
      <div className="d-flex">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="ml-2">
          <span className={css.Owner}>{owner}</span>
          <span className={css.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
      {is_owner && !showEditForm && (
        <MoreDropdown
          handleEdit={() => setShowEditForm(true)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Comment;
