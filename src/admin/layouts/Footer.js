import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-4 bg-gray-800 text-white">
      <p>&copy; {currentYear} Bima Insurance. All rights reserved.</p>
    </div>
  );
};

export default Footer;
