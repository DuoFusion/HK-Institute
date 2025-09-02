import { Image } from "antd";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Queries } from "../../Api";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const BlogDescription = () => {
  const { id } = useParams();

  const { data: BlogDescription } = Queries.useGetBlogDescription(id);
  const BlogData = BlogDescription?.data;

  return (
    <>
      <Breadcrumbs mainTitle="Blog Description" parent="Blog" />
      <Container>
        <Row>
          <Col sm="12">
            <Card className="shadow border-0">
              <CardBody>
                <div className="blog-single">
                  <div className="blog-box blog-details">
                    <Image className="img-fluid w-100 rounded-3" preview={false} src={BlogData?.image} alt="blog-main" />
                    <div className="blog-details mt-3">
                      <h1 className="title">{BlogData?.title}</h1>
                      <p className="copy">{BlogData?.subtitle}</p>
                      <ul className="blog-social">
                        <li dangerouslySetInnerHTML={{ __html: BlogData?.description }} />
                        {/* <li>{"25 July 2024"}</li> */}
                        {/* {blogBoxShadowList.map((item) => (
                        <li key={item.id}>
                          <i className={`icofont icofont-${item.icon}`} />
                          <span>{item.text}</span>
                        </li>
                      ))} */}
                      </ul>
                      {/* <h4 className="mt-3 f-w-600">{"The Harpeth rises in the westernmost part of Rutherford County, just to the east of the community of College Grove in eastern Williamson County. Internet."}</h4> */}
                      {/* <div className="single-blog-content-top">
                      {singleBlogContent.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div> */}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDescription;
