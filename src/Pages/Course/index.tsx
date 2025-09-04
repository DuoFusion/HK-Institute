import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Queries } from "../../Api";
import { Href, RouteList } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const Course = () => {
  const navigate = useNavigate();
  const { data: CoursePurchased, isLoading: CoursePurchasedLoading } = Queries.useGetCoursePurchased();
  const { data: CourseUnPurchased, isLoading: CourseUnPurchasedLoading } = Queries.useGetCourseUnPurchased();

  return (
    <>
      <Breadcrumbs mainTitle="Course" parent="Pages" />
      <main className="page-content">
        {CoursePurchasedLoading && CourseUnPurchasedLoading ? (
          <></>
        ) : (
          <>
            {CoursePurchased?.data?.length > 0 && (
              <div>
                <h2 className="text-center pb-4">Un Lock Courses</h2>
                <Row>
                  {CoursePurchased?.data?.map((item, index) => (
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
            {CourseUnPurchased?.data?.length > 0 && (
              <div>
                <h2 className="text-center pb-4">Lock Courses</h2>
                <Row>
                  {CourseUnPurchased?.data?.map((item, index) => (
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
        )}
      </main>
    </>
  );
};

export default Course;
