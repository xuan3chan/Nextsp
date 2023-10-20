import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, AdminLayout } from "./components";
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
      </Routes>
    </Router>
  );
};

export default App;
