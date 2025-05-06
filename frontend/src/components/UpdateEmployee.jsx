import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/auth/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.Status) {
          setEmployee(res.data.data);
        } else {
          alert("Failed to load employee data");
        }
      } catch (err) {
        console.error("Fetch employee error:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.Status) {
          setCategories(res.data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Category error:", err);
      }
    };

    fetchEmployee();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", employee.category_id);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/auth/employee/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.Status) {
        alert("Employee updated successfully!");
        navigate("/home/employee");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Update Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 text-black">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category_id"
            value={employee.category_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fileInput" className="block mb-1 font-medium">
            Profile Image
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 text-black"
            >
              Choose File
            </button>
            {imageFile && <p className="text-gray-600">{imageFile.name}</p>}
          </div>
          {!imageFile && employee.image && (
            <img
              src={`http://localhost:3000/Images/${employee.image}`}
              alt="Current"
              className="mt-2 w-20 h-20 object-cover rounded"
            />
          )}
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
