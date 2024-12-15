import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-2">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/users" className="block py-2">
              Users
            </Link>
          </li>
          <li>
            <Link to="/todos" className="block py-2">
              TODOs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
