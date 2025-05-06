import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/add_category",
        { category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status) {
        navigate("/home/category");
      } else {
        alert(response.data.error || "Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      } else {
        console.error("Add category error:", err);
        alert("Server error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
