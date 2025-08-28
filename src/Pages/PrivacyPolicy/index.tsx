import { Card, CardBody, Col, Container } from "reactstrap";
import { Queries } from "../../Api";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { Spin } from "antd";

const PrivacyPolicy = () => {
  const { data: PrivacyPolicy, isLoading: isPrivacyPolicyLoading } = Queries.useGetPrivacyPolicy();
  return (
    <Container>
      <Col md="12">
        <Card>
          <CommonCardHeader title="Privacy Policy" />
          <CardBody>
            {isPrivacyPolicyLoading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              <div className="content" dangerouslySetInnerHTML={{ __html: PrivacyPolicy?.data?.privacyPolicy || "" }} />
            )}
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default PrivacyPolicy;
