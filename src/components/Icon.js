import React from "react";

const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
  if (!name) return null;

  return (
    <i
      className={`bi bi-${name} ${className}`}
      style={{ fontSize: size, color }}
      aria-hidden="true"
    ></i>
  );
};

export default Icon;
