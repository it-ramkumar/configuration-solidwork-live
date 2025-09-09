// components/buttons/GoDirectionButton.jsx
import React from "react";

const InteriorDirectionButton = ({ onClick, label = "▲", size = 50 }) => {
  return (
    <button
      className="btn btn-light rounded-circle shadow"
      aria-label={label}
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: "1.25rem",
      }}
    >
      {label}
    </button>
  );
};

export default InteriorDirectionButton;
