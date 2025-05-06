import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Category from "./components/Category";
import Profile from "./components/Profile";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="add_employee" element={<AddEmployee />} />
          <Route path="update_employee/:id" element={<UpdateEmployee />} />
          <Route path="category" element={<Category />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
