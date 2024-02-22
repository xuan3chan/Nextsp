import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Categories,
  Products,
  Brands,
  Orders,
  Dashboard,
} from "./components";
import { ThemeProvider } from "./components/theme/ThemeContext";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/admin/dashboard"
            element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/categories"
            element={
              isAuthenticated ? <Categories /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/brands"
            element={isAuthenticated ? <Brands /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
