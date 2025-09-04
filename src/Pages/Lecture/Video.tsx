import { useLocation } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";

const Video = () => {
  const { state } = useLocation();
  return (
    <>
      <Breadcrumbs mainTitle="Video" parent="Lecture" />
      <Container>
        <Row>
          <Col sm="12">
            <Card className="shadow border-0">
              <CardBody>
                <iframe title="drive-player" src={state} width={`100%`} height={`500`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Video;
