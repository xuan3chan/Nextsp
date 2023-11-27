import React, { Fragment, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import moment from "moment";

const AdminFooter = (props) => {

  const {darkMode, setDarkmode } = useContext(ThemeContext)

  return (
    <Fragment>
      <footer
        className={`z-10 py-6 px-4 md:px-12 border border-black text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#303031] text-[#87898A]'}`}
      >
        Develop & Design ThaiTam © Copyright {moment().format("YYYY")}
      </footer>
    </Fragment>
  );
};

export default AdminFooter;
