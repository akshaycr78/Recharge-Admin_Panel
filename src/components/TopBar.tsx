import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative bg-white shadow-sm border-b px-6 h-24 flex justify-between items-center">
      {/* Left - Logo + Hamburger */}
      <div className="flex items-center gap-4">
        <button onClick={() => setShowMenu(!showMenu)}>
          <i className="fas fa-bars text-xl text-gray-800" />
        </button>
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
          Admin Panel
        </div>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-4">
        <i className="fas fa-bell text-xl text-gray-600" />
        <i
          className="fas fa-user-circle text-2xl text-gray-700 cursor-pointer"
          onClick={() => handleNavigate("/profile")}
          title="Profile"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-24 left-4 bg-white border rounded-md shadow-md z-50 w-56"
        >
          <ul className="flex flex-col py-2 text-gray-700 text-sm font-medium">
            <li onClick={() => handleNavigate("/admin-home")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li>
            <li onClick={() => handleNavigate("/dashboard")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</li>
            <li onClick={() => handleNavigate("/transactions")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Transactions</li>
            <li onClick={() => handleNavigate("/users")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Users</li>
            <li onClick={() => handleNavigate("/walletmanagement")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Wallet Management</li>
            <li onClick={() => handleNavigate("/support")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
            <li onClick={() => handleNavigate("/settings")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Topbar;
