import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog } from "@fortawesome/free-solid-svg-icons"; // Import the icons you need
import Logo from "../../assets/logo.jpeg";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-white shadow-md">
      {/* Left side */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="w-28 h-28 mr-2" />
        {/* <span className="text-lg font-bold">Admin Panel</span> */}
      </div>

      {/* Middle */}
      <span className="text-3xl font-bold">Admin Panel</span>

      {/* Right side */}
      <div className="flex items-center">
        <div className="mr-4">
          {/* Person Icon */}
          <FontAwesomeIcon icon={faUser} className="text-gray-600" />
        </div>
        <div>
          {/* Settings Icon */}
          <FontAwesomeIcon icon={faCog} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Header;
