import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import
import axios from "axios";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/auth/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.Status) {
          setCategories(res.data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("salary", salary);
      formData.append("address", address);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:3000/auth/add_employee",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.Status) {
        alert("Employee added successfully!");
        navigate("/home/employee");
      } else {
        alert("Failed to add employee.");
      }
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to add employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 text-black">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Salary */}
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
        {/* Profile Image */}
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
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 text-black"
            >
              Choose File
            </button>
            {image && <p className="text-gray-600">{image.name}</p>}
          </div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded"
            />
          )}
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
