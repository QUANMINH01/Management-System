import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // Trạng thái hiển thị table hay list

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Số lượng phần tử trên mỗi trang tùy vào chế độ hiển thị
  const limit = viewMode === "table" ? 7 : 6;

  // Sử dụng useCallback để tránh việc tạo lại function mỗi lần render
  const fetchEmployee = useCallback(
    async (page) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/auth/employee?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.Status) {
          setEmployees(res.data.data);
          setTotalPages(res.data.totalPages);
        } else {
          console.error("Error: ", res.data.error);
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    },
    [limit]
  ); // `limit` là dependency của `fetchEmployee`

  useEffect(() => {
    fetchEmployee(currentPage);
  }, [currentPage, viewMode, fetchEmployee]); // Thêm `fetchEmployee` vào dependency array

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:3000/auth/employee/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.Status) {
        fetchEmployee(currentPage);
      } else {
        console.error("Failed to delete:", res.data.error);
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "list" : "table"); // Chuyển giữa chế độ table và list
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl text-gray-800">Employee List</h3>
        <div className="flex gap-4">
          <Link
            to="/home/add_employee"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Employee
          </Link>
          <button
            onClick={toggleViewMode} // Thay đổi chế độ hiển thị
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {viewMode === "table" ? "Switch to List" : "Switch to Table"}
          </button>
        </div>
      </div>

      {/* Hiển thị theo chế độ table hoặc list */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-6 py-4 border-b">Image</th>
                <th className="text-left px-6 py-4 border-b">Name</th>
                <th className="text-left px-6 py-4 border-b">Email</th>
                <th className="text-left px-6 py-4 border-b">Salary</th>
                <th className="text-left px-6 py-4 border-b">Address</th>
                <th className="text-left px-6 py-4 border-b">Category</th>
                <th className="text-left px-6 py-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.image ? (
                        <img
                          src={`http://localhost:3000/Images/${emp.image}`}
                          alt={emp.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.email}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.salary}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.address}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      {emp.category_name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-800">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openModal(emp)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Detail
                        </button>
                        <Link
                          to={`/home/update_employee/${emp.id}`}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Update
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employees.length > 0 ? (
            employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white p-4 rounded-3xl shadow-md border-2 border-gray-300 flex flex-col items-center"
              >
                {emp.image && (
                  <div className="text-center mb-4">
                    <img
                      src={`http://localhost:3000/Images/${emp.image}`}
                      alt={emp.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}
                <h4 className="text-xl font-semibold mb-2 text-center">
                  {emp.name}
                </h4>
                <p className="text-gray-600 text-center">Email: {emp.email}</p>
                <p className="text-gray-600 text-center">
                  Salary: {emp.salary}
                </p>
                <p className="text-gray-600 text-center">
                  Address: {emp.address}
                </p>
                <p className="text-gray-600 text-center">
                  Category: {emp.category_name}
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openModal(emp)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Detail
                  </button>
                  <Link
                    to={`/home/update_employee/${emp.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      )}

      {/* Pagination UI */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="bg-white max-w-170 w-full p-8 rounded-xl shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Employee Details
            </h2>
            <div className="flex flex-col items-center gap-y-10 mt-6">
              {selectedEmployee.image && (
                <div className="text-center">
                  <img
                    src={`http://localhost:3000/Images/${selectedEmployee.image}`}
                    alt={selectedEmployee.name}
                    className="w-40 h-40 object-cover rounded border-2 border-gray-300"
                  />
                </div>
              )}
              <div className="text-gray-700 space-y-4 w-full max-w-md">
                <div className="flex justify-between">
                  <strong>Name:</strong>
                  <span>{selectedEmployee.name}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Email:</strong>
                  <span>{selectedEmployee.email}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Salary:</strong>
                  <span>${selectedEmployee.salary}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Address:</strong>
                  <span>{selectedEmployee.address}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Category:</strong>
                  <span>{selectedEmployee.category_name || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
