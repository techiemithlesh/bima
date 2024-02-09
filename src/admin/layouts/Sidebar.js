import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "../../shared/Assets";

const Sidebar = () => {
  // Get the current location
  const location = useLocation();

  // Define a function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="text-white mr-4 sidebar_container mb-4 w-44 shadow-sm">
      
      <ul className="sidebar_ul">
        <li className={`flex items-center mb-4 ${isActive("/admin/dashboard")}`}>
          <img src={Icons.DashboardIcon} alt="Dashboard" className="object-fill"/>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </li>
        <li className={`flex items-center mb-4 ${isActive("/admin/partners")}`}>
          <img src={Icons.PartnerIcon} alt="Partner" className="object-fill"/>
          <Link to='/admin/partners'>Partners</Link>
        </li>
        <li className={`flex items-center mb-4 ${isActive("/policy/list")}`}>
          <img src={Icons.PolicyIcon} alt="Policy" className="object-fill"/>
          <Link to='/policy/list'>Policies</Link>
        </li>
        <li className={`flex items-center mb-4 ${isActive("/payout")}`}>
          <img src={Icons.PayoutIcon} alt="Payout"/>
          <Link to='/payout'>Payout</Link>
        </li>
        <li className={`flex items-center mb-4 ${isActive("/about")}`}>
          <img src={Icons.About} alt="About" className="object-fill"/>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
