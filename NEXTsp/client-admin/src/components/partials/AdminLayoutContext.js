import React, { createContext, useState, useEffect } from 'react';

export const AdminLayoutContext = createContext();

export const AdminLayoutProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState('block');

  return (
    <AdminLayoutContext.Provider value={{ isSidebarVisible, setSidebarVisible }}>
      {children}
    </AdminLayoutContext.Provider>
  );
};