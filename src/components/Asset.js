/// IMPORTS ///

// Data / API / Hooks / Context
import React from "react";

// Media / CSS
import css from "../css/Asset.module.css";

// Components
import { Spinner } from "react-bootstrap";

// Asset component displays a spinner, image, or message based on the passed props
const Asset = ({ spinner, src, message }) => {
  return (
    // Wrapper div with styling from the CSS module
    <div className={`${css.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
