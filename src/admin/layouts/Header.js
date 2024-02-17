import React, { useState } from "react";
import { Icons, Images } from "../../shared/Assets";
import { Link } from "react-router-dom";

const Header = () => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white shadow-md">
      {/* Left side */}
      <div className="flex items-center">
        <Link to='/admin/dashboard'>
        <img src={Images.Logo} alt="Logo" className="w-28 h-28 mr-2" />
        </Link>
      </div>

      {/* Middle */}
      <span className="text-3xl font-bold header">Admin Panel</span>

      {/* Right side */}
      <div className="relative">
      <div
        className="flex items-center justify-center mr-4 hover:pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={Icons.UserIcon} alt="User" className="object-fill cursor-pointer"/>
      </div>
      {isHovered && (
        <div className="absolute w-32 right-0 top-0 mt-10 mr-4 p-4 bg-white shadow-lg">
          <ul>
            <li><Link to='/'>My Profile</Link></li>
            <li><Link to='/'>Logout</Link></li>
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default Header;
