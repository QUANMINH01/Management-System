import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-300 text-black border-r border-gray-300 flex flex-col p-5 shadow-md">
        <h1 className="text-2xl font-bold mb-10">Management System</h1>
        <nav className="flex flex-col space-y-4">
          {/* Dashboard button */}
          <button
            onClick={() => handleNavigation("/home/dashboard")}
            className={`flex items-center space-x-4 text-left px-3 py-2 rounded hover:bg-gray-400 ${
              location.pathname === "/home/dashboard" ? "bg-gray-400" : ""
            }`}
          >
            <HomeOutlined className="text-lg" />
            <span>Dashboard</span>
          </button>

          {/* Employee Management button */}
          <button
            onClick={() => handleNavigation("/home/employee")}
            className={`flex items-center space-x-4 text-left px-3 py-2 rounded hover:bg-gray-400 ${
              location.pathname === "/home/employee" ? "bg-gray-400" : ""
            }`}
          >
            <UsergroupAddOutlined className="text-lg" />
            <span>Employee Management</span>
          </button>

          {/* Category button */}
          <button
            onClick={() => handleNavigation("/home/category")}
            className={`flex items-center space-x-4 text-left px-3 py-2 rounded hover:bg-gray-400 ${
              location.pathname === "/home/category" ? "bg-gray-400" : ""
            }`}
          >
            <AppstoreAddOutlined className="text-lg" />
            <span>Category</span>
          </button>

          {/* Profile button */}
          <button
            onClick={() => handleNavigation("/home/profile")}
            className={`flex items-center space-x-4 text-left px-3 py-2 rounded hover:bg-gray-400 ${
              location.pathname === "/home/profile" ? "bg-gray-400" : ""
            }`}
          >
            <UserOutlined className="text-lg" />
            <span>Profile</span>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 text-left hover:bg-red-100 bg-red-50 text-red-600 px-3 py-2 rounded mt-auto"
          >
            <LogoutOutlined className="text-lg" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="bg-gray-200 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-200 shadow px-10 py-4 border-b border-gray-200 flex justify-between items-center">
          {/* Header Title */}
          <h2 className="text-3xl font-semibold text-black">
            Display Information
          </h2>

          {/* Header right - Icons */}
          <div className="flex space-x-6">
            <BellOutlined className="text-xl text-gray-600 cursor-pointer" />
            <SettingOutlined className="text-xl text-gray-600 cursor-pointer" />
          </div>
        </header>

        {/* Page content via Outlet */}
        <main className="flex-1 p-10 text-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
