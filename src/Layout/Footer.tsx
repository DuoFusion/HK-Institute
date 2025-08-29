import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="12" className="p-0 footer-copyright">
            <p className="mb-0">Copyright 2025 © HK Digiverse & IT Consultancy Pvt Ltd</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
