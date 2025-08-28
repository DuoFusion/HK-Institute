import { Fragment } from "react";
import Banner from "./Banner";
import Category from "./Category";
import Course from "./Course";

const Dashboard = () => {
  return (
    <Fragment>
      <Banner />
      <Category />
      <Course />
    </Fragment>
  );
};

export default Dashboard;
