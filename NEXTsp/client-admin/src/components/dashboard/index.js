import React, {Fragment, useContext} from "react";
import AdminLayout from "../layout/AdminLayout";
import { ThemeContext } from "../theme/ThemeContext";
import DashboardBarByYear from "./DashboardBarByYear";
import DashboardBarByMonth from './DashboardBarByMonth'


const DashboardComponent = () => {
  const { darkMode } = useContext(ThemeContext)
  const darkBg = darkMode ? 'bg-gray-800' : ''

  return (
    <div className= {`grid grid-cols-1 space-y-4 p-4 ${darkBg}`}>
      <DashboardBarByYear/>
      <DashboardBarByMonth/>
    </div>
  );
}

const Dashboard = (props) => {
  return (
    <Fragment>
      <AdminLayout children={<DashboardComponent/>} />
    </Fragment>
  );
}

export default Dashboard;