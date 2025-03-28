/// IMPORTS ///

// Data / API / Hooks / Context
import React from "react";

// Icon component for Bootstrap SVG icons with customizable size, color, and class
const Icon = ({ name, size = 24, className = "" }) => {
  // Don't render anything if 'name' isn't provided
  if (!name) return null;

  return (
    <i
      // Combine Bootstrap icon class with any custom class
      className={`bi bi-${name} ${className}`}
      // Apply size, color, and remove margin
      style={{ fontSize: `${size}px`, margin: 0 }}
      aria-hidden="true"
    ></i>
  );
};

export default Icon;
