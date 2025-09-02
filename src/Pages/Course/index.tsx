import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Queries } from "../../Api";
import { Href, RouteList } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const Course = () => {
  const navigate = useNavigate();
  const { data: Course, isLoading } = Queries.useGetCourse({ featureFilter: true, actionFilter: true });
  const CourseData = Course?.data;

  const UnLockCourses = CourseData?.course_data?.filter((item) => item.locked === true);
  const LockCourses = CourseData?.course_data?.filter((item) => item.locked !== true);

  return (
    <>
      <Breadcrumbs mainTitle="Course" parent="Pages" />
      <main className="page-content">
        {isLoading ? (
          <></>
        ) : CourseData?.course_data?.length > 0 ? (
          <>
            {UnLockCourses?.length > 0 && (
              <div>
                <h2 className="text-center pb-4">Un Lock Courses</h2>
                <Row>
                  {UnLockCourses.map((item, index) => (
                    <Col md="6" lg="4" xl="3" key={index}>
                      <Card className="shadow border-0 pointer">
                        <CardBody>
                          <div onClick={() => navigate(`${RouteList.Lecture}/${item._id}`)}>
                            <Image className="img-fluid w-100 rounded" preview={false} src={item?.image} alt="Course-main" />
                            <div className="latest-news-text mt-3 p-0">
                              <p className="copy text-center">{item.name}</p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {LockCourses?.length > 0 && (
              <div>
                <h2 className="text-center pb-4">Lock Courses</h2>
                <Row>
                  {LockCourses.map((item, index) => (
                    <Col md="6" lg="4" xl="3" key={index}>
                      <Card className="shadow border-0 lock">
                        <CardBody>
                          <Link to={Href}>
                            <Image className="img-fluid w-100 rounded" preview={false} src={item?.image} alt="Course-main" />
                            <div className="latest-news-text mt-3 p-0">
                              <p className="copy text-center">{item.name}</p>
                            </div>
                          </Link>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        ) : null}
      </main>
    </>
  );
};

export default Course;
