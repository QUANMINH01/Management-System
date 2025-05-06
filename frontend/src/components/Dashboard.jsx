import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTotalEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/auth/total-employees",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.Status) {
          setTotalEmployees(res.data.totalEmployees);
        }
      } catch (err) {
        console.error("Error fetching total employees:", err);
      }
    };

    const fetchTotalSalary = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/total-salary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.Status) {
          setTotalSalary(res.data.totalSalary);
        }
      } catch (err) {
        console.error("Error fetching total salary:", err);
      }
    };

    fetchTotalEmployees();
    fetchTotalSalary();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📊 Company Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-blue-800">
            👥 Total Employees
          </h2>
          <p className="text-4xl mt-3 text-blue-900 font-semibold">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-green-800">💰 Total Salary</h2>
          <p className="text-4xl mt-3 text-green-900 font-semibold">
            ${totalSalary}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-yellow-800">📈 Avg. Salary</h2>
          <p className="text-4xl mt-3 text-yellow-900 font-semibold">
            ${totalEmployees ? (totalSalary / totalEmployees).toFixed(2) : 0}
          </p>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          🔍 Company Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insight Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">
              🚀 Growth Rate
            </h4>
            <p className="text-gray-600 mb-4">
              Analyze employee growth over time to identify hiring trends and
              expansion periods.
            </p>
            <a href="#" className="text-blue-600 font-medium hover:underline">
              View Graph →
            </a>
          </div>

          {/* Insight Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2 text-green-700">
              📊 Budget Allocation
            </h4>
            <p className="text-gray-600 mb-4">
              Understand how your payroll compares to other expense categories.
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">
              Explore Details →
            </a>
          </div>

          {/* Insight Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2 text-yellow-700">
              🧑‍💼 Employee Categories
            </h4>
            <p className="text-gray-600 mb-4">
              Track how employees are distributed across departments and roles.
            </p>
            <a href="#" className="text-yellow-600 font-medium hover:underline">
              See Breakdown →
            </a>
          </div>
        </div>

        {/* CTA dưới cùng */}
        <div className="text-center mt-10">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition font-semibold">
            🔗 Generate Full Report
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16">
        &copy; {new Date().getFullYear()} Company Name. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
