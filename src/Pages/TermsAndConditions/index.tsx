import { Card, CardBody, Col, Container } from "reactstrap";
import { Queries } from "../../Api";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Spin } from "antd";

const TermsAndConditions = () => {
  const { data: TermsAndConditions, isLoading: isTermsAndConditionsLoading } = Queries.useGetTermsAndConditions();
  return (
    <Container>
      <Col md="12">
        <Card>
          <CommonCardHeader title="Privacy Policy" />
          <CardBody>
            {isTermsAndConditionsLoading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              <div className="content" dangerouslySetInnerHTML={{ __html: TermsAndConditions?.data?.termsCondition || "" }} />
            )}
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default TermsAndConditions;
