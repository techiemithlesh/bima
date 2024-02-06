import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../shared/Assets";

const Sidebar = () => {
  return (
    <div className="text-white mr-4 sidebar_container mb-4 w-44 shadow-sm">
      
      <ul className="sidebar_ul">
        <li className="flex items-center mb-4 active border-b-2 border-gray-300">
          <img src={Icons.DashboardIcon} alt="Dashboard" className="object-fill"/>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </li>
        <li className="flex items-center mb-4 border-b-2 border-gray-300">
        <img src={Icons.PartnerIcon} alt="Partner" className="object-fill"/>
          <Link to='/admin/partners' color="">Partners</Link>
        </li>
        <li className="flex items-center mb-4 border-b-2 border-gray-300">
        <img src={Icons.PolicyIcon} alt="Policy" className="object-fill"/>
          <Link to='/policy/add'>Policies</Link>
        </li>
        <li className="flex items-center mb-4 border-b-2 border-gray-300">
        <img src={Icons.PayoutIcon} alt="Payout"/>
          <Link to='#'>Payout</Link>
        </li>
        <li className="flex items-center mb-4 border-b-2 border-gray-300">
        <img src={Icons.About} alt="About" className="object-fill"/>
          <Link to="#">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
