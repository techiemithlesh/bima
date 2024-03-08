
import React from "react";

const Card = ({ children, bgColor = "white" }) => {
  const cardStyle = `bg-${bgColor} pl-6 py-1 h-full rounded-md shadow-md`;

  return (
    <div className={cardStyle}>
      {children}
    </div>
  );
};

export default Card;
