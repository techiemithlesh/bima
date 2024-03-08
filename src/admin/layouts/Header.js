import React, { useState } from "react";
import { Icons, Images } from "../../shared/Assets";
import { Link } from "react-router-dom";

const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
              onClick={toggleDropdown}
          >
        <img src={Icons.UserIcon} alt="User" className="object-fill cursor-pointer"/>
      </div>
          {isDropdownOpen && (
              <div className={`absolute right-0 mr-1 bg-white rightmenu shadow-lg transition-all duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
             <ul className="p-4">
                  {/*<li><Link to='/'>My Profile</Link></li>*/}
              <li><a href="/global/commision/list" className="block">Global Commission</a></li>
            <li><Link to='/'>Logout</Link></li>
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default Header;
