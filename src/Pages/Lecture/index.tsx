import { Image, Pagination } from "antd";
import { TableDocument, Youtube } from "iconsax-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Queries } from "../../Api";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import { useBasicTableFilterHelper } from "../../Utils/hook";
import LinkModel from "./LinkModel";
import PdfModel from "./PdfModel";

const Lecture = () => {
  const [isLinkModal, setLinkModal] = useState(false);
  const [isPdfModal, setPdfModal] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);

  const { id } = useParams();

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
      <Breadcrumbs mainTitle="Lecture" parent="Course" />
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
                                              <li
                                                onClick={() => {
                                                  setLink(item?.youtubeLink);
                                                  setLinkModal(true);
                                                }}
                                              >
                                                <div className="d-flex align-items-center">
                                                  <Youtube size="20" color="#000" className="me-2" />
                                                  Link
                                                </div>
                                              </li>
                                              <li
                                                onClick={() => {
                                                  setPdf(item?.PDF);
                                                  setPdfModal(true);
                                                }}
                                              >
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

      {/* Pass selected state values here */}
      <LinkModel isModal={isLinkModal} setModal={setLinkModal} link={link} />
      <PdfModel isModal={isPdfModal} setModal={setPdfModal} pdf={pdf} />
    </>
  );
};

export default Lecture;
