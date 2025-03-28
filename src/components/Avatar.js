/// IMPORTS ///

// Data / API / Hooks / Context
import React from "react";

// Media / CSS
import css from "../css/Avatar.module.css";

// Avatar component displays an image with optional text next to it
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={css.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
