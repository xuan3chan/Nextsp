import React, { Fragment, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  const { darkMode, setDM } = useContext(ThemeContext)
  return (
    <Fragment>
      <AdminNavber />
      <section className={`flex ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <AdminSidebar />
        <div className="w-full md:w-11/12 h-full">
          {/* All Children pass from here */}
          {children}
        </div>
      </section>
      <AdminFooter />
    </Fragment>
  );
};

export default AdminLayout;