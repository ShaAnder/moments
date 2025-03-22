/// IMPORTS ///

import React from "react";

// Icon component for bootstrap svgs, a;;pws the user to set base sizing / color and a custom className
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
  if (!name) return null;

  return (
    <i
      className={`bi bi-${name} ${className}`}
      style={{ fontSize: size, color, margin: 0 }}
      aria-hidden="true"
    ></i>
  );
};

export default Icon;
