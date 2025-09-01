import { Image } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Queries } from "../../Api";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import { useBasicTableFilterHelper } from "../../Utils/hook";
import { TableDocument, Youtube } from "iconsax-react";
import LinkModel from "./LinkModel";
import { useState } from "react";
import PdfModel from "./PdfModel";

const Lecture = () => {
  const [isLinkModal, setLinkModal] = useState(false);
  const [isPdfModal, setPdfModal] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();

  const { pageNumber, pageSize, params, handlePaginationChange } = useBasicTableFilterHelper({
    initialParams: { page: 1, limit: 6 },
    debounceDelay: 500,
  });

  const { data: Lecture, isLoading } = Queries.useGetLecture({ courseFilter: id });
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
                        <Image className="img-fluid rounded-3" preview={false} src={state?.image} alt="blog-main" />
                      </div>
                      <div className="blog-details mt-3">
                        <h1 className="title text-center">{state.name}</h1>
                        {/* <ul className="blog-social">
                        <li>{"25 July 2024"}</li>
                        {blogBoxShadowList.map((item) => (
                          <li key={item.id}>
                            <i className={`icofont icofont-${item.icon}`} />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul> */}
                        {/* <h4 className="mt-3 f-w-600">{"The Harpeth rises in the westernmost part of Rutherford County, just to the east of the community of College Grove in eastern Williamson County. Internet."}</h4> */}
                        {/* <div className="single-blog-content-top">
                        {singleBlogContent.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      </div> */}
                      </div>
                    </div>
                  </Col>
                  <Col md="8">
                    <section className="comment-box">
                      <h4>Lectures</h4>
                      <hr />
                      <ul>
                        {LectureData?.lecture_data.map((item, index) => (
                          <li key={index}>
                            <ul>
                              <li>
                                {/* <iframe title="drive-player" src="https://drive.google.com/file/d/1KSpTSiSuyB-yi1Ypw6x6zESAW3Wum-Tx/preview" width={`100%`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" /> */}
                                <div className="d-flex align-self-center">
                                  <Image className="align-self-center" src={item?.thumbnail} preview={false} alt="Generic placeholder image" />
                                  <div className="flex-grow-1">
                                    <Row className="align-items-center">
                                      <Col md={4}>
                                        <h6 className="mt-0">{index + 1} Lecture</h6>
                                      </Col>
                                      <Col md={8}>
                                        <ul className="d-flex flex-row comment-social float-start float-md-end">
                                          <li className="d-flex align-items-center" onClick={() => setLinkModal(true)}>
                                            <Youtube size="20" color="#000" className="me-2" />
                                            Link
                                          </li>
                                          <li className="d-flex align-items-center" onClick={() => setPdfModal(true)}>
                                            <TableDocument size="20" color="#000" className="me-2" />
                                            PDF
                                          </li>
                                        </ul>
                                      </Col>
                                    </Row>
                                    <p>{item?.title}</p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <LinkModel isModal={isLinkModal} setModal={setLinkModal} link={item.youtubeLink} />
                            <PdfModel isModal={isPdfModal} setModal={setPdfModal} pdf={item.PDF} />
                          </li>
                        ))}
                      </ul>
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
