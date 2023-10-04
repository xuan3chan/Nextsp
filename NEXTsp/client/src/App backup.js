import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./views/Auth";
import RegisterFrom from "./components/auth/RegisterFrom";
import Landing from "./components/layout/Landing";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/login" element={<Auth />} />
        <Route
          exact
          path="RegisterFrom"
          render={(props) => <Auth {...props} authRoute="RegisterFrom" />}
        />
        <Route exact path="/register" element={<RegisterFrom />} />
      </Routes>
    </Router>
  );
};

export default App;
