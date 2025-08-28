import { Card, CardBody, Col, Container } from "reactstrap";
import { Queries } from "../../Api";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Spin } from "antd";

const AboutUs = () => {
  const { data: AboutUs, isLoading: isAboutUsLoading } = Queries.useGetAboutUs();
  return (
    <Container>
      <Col md="12">
        <Card>
          <CommonCardHeader title="About Us" />
          <CardBody>
            {isAboutUsLoading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              <div className="content" dangerouslySetInnerHTML={{ __html: AboutUs?.data?.aboutUs || "" }} />
            )}
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default AboutUs;
