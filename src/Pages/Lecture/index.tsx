import { Image, Pagination } from "antd";
import { TableDocument, Youtube } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Queries } from "../../Api";
import { RouteList } from "../../Constant";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import { useBasicTableFilterHelper } from "../../Utils/hook";

const Lecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pageNumber, pageSize, params, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 6 },
    debounceDelay: 500,
  });

  const { data: Lecture } = Queries.useGetLecture({ ...params, courseFilter: id });

  const { data: Course } = Queries.useGetCourseDescription(id);
  const CourseData = Course?.data;

  const LectureData = Lecture?.data;

  return (
    <>
      <Breadcrumbs mainTitle="Lecture" parent="Lecture" />
      <Container>
        <Row>
          <Col sm="12">
            <Card className="shadow border-0">
              <CardBody>
                <div className="blog-single row">
                  <Col md="4">
                    <div className="blog-box blog-details">
                      <div className="row justify-content-center">
                        <Image className="img-fluid rounded-3" preview={false} src={CourseData?.image} alt="blog-main" />
                      </div>
                      <div className="blog-details mt-3">
                        <h1 className="title text-center">{CourseData?.name}</h1>
                      </div>
                    </div>
                  </Col>
                  <Col md="8">
                    <section className="comment-box">
                      <h4>Lectures</h4>
                      <hr />
                      {LectureData?.lecture_data.length > 0 ? (
                        <>
                          <ul>
                            {LectureData?.lecture_data.map((item, index) => (
                              <li key={index}>
                                <ul>
                                  <li>
                                    <div className="d-flex align-self-center">
                                      <Image className="align-self-center" src={item?.thumbnail} preview={false} alt="Generic placeholder image" />
                                      <div className="flex-grow-1">
                                        <Row className="align-items-center">
                                          <Col md={4}>
                                            <h6 className="mt-0">{index + 1} Lecture</h6>
                                          </Col>
                                          <Col md={8}>
                                            <ul className="flex-row comment-social float-start float-md-end">
                                              <li onClick={() => navigate(RouteList.Video, { state: item?.youtubeLink })}>
                                                <div className="d-flex align-items-center">
                                                  <Youtube size="20" color="#000" className="me-2" />
                                                  Link
                                                </div>
                                              </li>
                                              <li onClick={() => navigate(RouteList.Pdf, { state: item?.PDF })}>
                                                <div className="d-flex align-items-center">
                                                  <TableDocument size="20" color="#000" className="me-2" />
                                                  PDF
                                                </div>
                                              </li>
                                            </ul>
                                          </Col>
                                        </Row>
                                        <p>{item?.title}</p>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            ))}
                          </ul>
                          <Pagination total={LectureData?.totalData} pageSize={pageSize} current={pageNumber} align="center" showSizeChanger={true} onChange={handlePaginationChange} />
                        </>
                      ) : (
                        <h4 className="text-center">No Lectures Found</h4>
                      )}
                    </section>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Lecture;
