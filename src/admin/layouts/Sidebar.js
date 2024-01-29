import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHandshake,
  faFileAlt,
  faMoneyBill,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="text-white mr-4 sidebar_container mb-4 w-44 shadow-sm">
      
      <ul className="sidebar_ul">
        <li className="flex items-center mb-4 active">
          <FontAwesomeIcon icon={faHome} className="mr-2 text-blue-300 text-2xl"/>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </li>
        <li className="flex items-center mb-4">
          <FontAwesomeIcon icon={faHandshake} className="mr-2 text-blue-300 text-2xl"/>
          <Link to='/admin/partners' color="">Partners</Link>
        </li>
        <li className="flex items-center mb-4">
          <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-300 text-2xl"/>
          <Link to='#'>Policies</Link>
        </li>
        <li className="flex items-center mb-4">
          <FontAwesomeIcon icon={faMoneyBill} className="mr-2 text-blue-300 text-2xl"/>
          <Link to='#'>Payout</Link>
        </li>
        <li className="flex items-center mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-300 text-2xl"/>
          <Link to="#">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
