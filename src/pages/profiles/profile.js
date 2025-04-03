import React from "react";
import { useCurrentUser } from "../../contexts/currentUserContexts";

import css from "../../css/Profile.module.css";
import btnCss from "../../css/Button.module.css";

import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/profileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image_url, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center justify-content-between ${mobile && "flex-column"}`}
    >
      <div className="d-flex align-items-center">
        <div>
          <Link className="align-self-center" to={`/profiles/${id}`}>
            <Avatar src={image_url} height={imageSize} />
          </Link>
        </div>
        <div className={`mx-2 ${css.WordBreak}`}>
          <strong>{owner}</strong>
        </div>
      </div>

      <div>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnCss.Button} ${btnCss.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnCss.Button} ${btnCss.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
