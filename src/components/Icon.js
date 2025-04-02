/// IMPORTS ///

// Data / API / Hooks / Context
import React from "react";

// Use React.forwardRef to allow passing a ref to the underlying <i> tag
const Icon = React.forwardRef(({ name, size = 24, className = "" }, ref) => {
  // If no icon name, return null
  if (!name) return null;

  return (
    <i
      ref={ref} // Forward the ref to the <i> element
      className={`bi bi-${name} ${className}`} // Apply Bootstrap icon class
      style={{ fontSize: `${size}px`, margin: 0 }} // Control icon size dynamically
      aria-hidden="true" // Ensures the icon is ignored by screen readers
    ></i>
  );
});

export default Icon;
