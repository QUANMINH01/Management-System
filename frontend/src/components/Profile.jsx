import React from "react";

const Profile = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png" // Replace with actual image URL
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-600"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>

          <div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12m0 0l-4-4m4 4l4-4M8 12H4m4 0l4-4m-4 4l-4 4"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-600">Email</p>
                <p className="text-gray-800">johndoe@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10c0 .553.447 1 1 1h16c.553 0 1-.447 1-1V7c0-.553-.447-1-1-1H4c-.553 0-1 .447-1 1z"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-600">Phone</p>
                <p className="text-gray-800">+123 456 7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16M4 6h16M4 14h16M4 18h16"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-600">Address</p>
                <p className="text-gray-800">123 Main St, Springfield</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12h-8m0 0H5m16 0h-3m-1 4h4m-7-4h4m-2 4h2"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-600">Role</p>
                <p className="text-gray-800">Software Engineer</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 10v4h4m-4-4V6m0 4H6m4 0h4"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-600">Skills</p>
                <p className="text-gray-800">React, Node.js, Express, MySQL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-300"></div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 11.8c-1.7 0-3 1.3-3 3s1.3 3 3 3c.5 0 .9-.1 1.3-.3l-3-3c-.2.3-.4.5-.7.5-1 0-1.8-.8-1.8-1.8 0-.5.2-.9.5-1.2l3-3c-.2-.3-.4-.7-.7-1l-3 3c-.2-.2-.5-.3-.8-.3-.6 0-1.2.3-1.6.8-1.2 1.5-2.9 2.3-4.6 2.3-3.5 0-6.3-2.9-6.3-6.4 0-3.5 2.9-6.3 6.3-6.3 1.3 0 2.6.5 3.6 1.4 1.4 1.1 2.4 2.7 3 4.3h.1c.1-.1.2-.2.3-.3.2-.1.4-.2.6-.3-.3-2-1.6-3.7-3.6-4.7-1.3-.7-2.9-1.1-4.5-1.1-4.6 0-8.4 3.8-8.4 8.4 0 4.6 3.8 8.4 8.4 8.4 3.3 0 6.2-1.9 7.5-4.6l3.6 3.5c.5.5 1.3.6 1.9 0 .5-.5.6-1.3.2-1.9z"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 2l4 4-4 4m12-8l4 4-4 4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
