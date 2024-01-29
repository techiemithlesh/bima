
import React from "react";

const Card = ({ children, bgColor = "white" }) => {
  const cardStyle = `bg-${bgColor} p-10 h-full rounded-md shadow-md`;

  return (
    <div className={cardStyle}>
      {children}
    </div>
  );
};

export default Card;
