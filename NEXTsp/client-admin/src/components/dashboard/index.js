import React, {Fragment} from "react";
import AdminLayout from "../layout/AdminLayout";
import DashboardBar from "./DashboardBar";


const DashboardComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <DashboardBar/>
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