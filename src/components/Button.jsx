import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
    setTimeout(() => setIsClicked(false), 500); // Duration of the animation
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75 ${
        isClicked ? "animate-pulse" : ""
      }`}
    >
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  );
};

export default AddButton;
