import React, { Fragment, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { AdminLayoutProvider } from '../partials/AdminLayoutContext'

import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  const { darkMode, setDM } = useContext(ThemeContext)
  return (
    <Fragment>
      <AdminLayoutProvider>
        <AdminNavber />
        <section className={`flex ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <AdminSidebar />
          <div className="w-full h-full">
            {/* All Children pass from here */}
            {children}
          </div>
        </section>
        <AdminFooter />
      </AdminLayoutProvider>
    </Fragment>
  );
};

export default AdminLayout;