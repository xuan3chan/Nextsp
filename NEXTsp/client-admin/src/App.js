import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, AdminLayout, Categories, Products, Brands, Orders} from "./components";
import Landing from "./components/layout/Landing";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard/categories"
          element={isAuthenticated ? <Categories /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard/brands"
          element={isAuthenticated ? <Brands /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard/products"
          element={isAuthenticated ? <Products/> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard/orders"
          element={isAuthenticated ? <Orders/> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
