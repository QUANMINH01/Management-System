import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/auth/categories?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.Status) {
        setCategories(res.data.data);
        setTotalPages(res.data.totalPages); // Lấy tổng số trang từ API
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl text-gray-800">Category List</h3>
        <Link
          to="/home/add_category"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Category
        </Link>
      </div>

      {/* Hiển thị spinner khi loading */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-6 py-4 border-b">ID</th>
                <th className="text-left px-6 py-4 border-b">Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 border-b text-gray-800">{cat.id}</td>
                  <td className="px-6 py-4 border-b text-gray-800">
                    {cat.name}
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Category;
