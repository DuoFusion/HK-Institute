import { Add, Minus } from "iconsax-react";
import { useState } from "react";
import { Card, CardBody, CardHeader, Col, Collapse, Container } from "reactstrap";
import { Queries } from "../../Api";

const Faq = () => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const { data: FAQ, isLoading } = Queries.useGetFaq();
  const FAQData = FAQ?.data;

  const handleChange = (id: string) => setActiveFaqId((prev) => (prev === id ? null : id));

  return (
    <Container className="py-5">
      {isLoading ? (
        <></>
      ) : (
        FAQData?.faq_data?.length > 0 && (
          <Col md="12">
            <div className="flat-title wow fadeInUp">
              <div className="title display-lg-3 fw-normal">FAQ</div>
              <p className="desc text-main text-md">FAQs - Frequently Asked Questions</p>
            </div>
            <Card className="shadow-none border-0">
              <CardBody>
                <div className="faq-accordion">
                  <Col xl="12" className="p-0">
                    {FAQData?.faq_data?.map((item, index) => (
                      <Card key={index} className="mb-3 border-0 shadow-xl rounded-3">
                        <CardHeader className="bg-white border-0 p-3 d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} onClick={() => handleChange(item._id)}>
                          <h6 className="mb-0 fw-semibold">{item.question}</h6>
                          <div className="ms-3">{activeFaqId === item._id ? <Minus size="20" className="text-primary" /> : <Add size="20" className="text-primary" />}</div>
                        </CardHeader>
                        <Collapse isOpen={activeFaqId === item._id}>
                          <CardBody className="pt-0 text-muted">{item.answer}</CardBody>
                        </Collapse>
                      </Card>
                    ))}
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>
        )
      )}
    </Container>
  );
};

export default Faq;
