import { Fragment } from "react";
import Banner from "./Banner";
import Category from "./Category";
import Course from "./Course";
import Blog from "./Blog";
import LatestNews from "./LatestNews";
import Faq from "./Faq";

const Dashboard = () => {
  return (
    <Fragment>
      <Banner />
      <Category />
      <Course />
      <Blog />
      <LatestNews />
      <Faq />
    </Fragment>
  );
};

export default Dashboard;
