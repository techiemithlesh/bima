
import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white p-10 h-full rounded-md shadow-md">
      {children}
    </div>
  );
};

export default Card;
