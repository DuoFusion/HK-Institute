import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Mutations } from "../../Api";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { TextInput } from "../../CoreComponents/formFields";
import { useAppSelector } from "../../ReduxToolkit/Hooks";
import { ChangePasswordPayload } from "../../Types/Auth";
import { ChangePasswordSchema } from "../../Utils/ValidationSchemas";

const ChangePassword = () => {
  const { mutate: ChangePassword, isPending } = Mutations.useChangePassword();
  const { user } = useAppSelector((store) => store.auth);

  const handleSubmit = async (values: ChangePasswordPayload, { resetForm }: FormikHelpers<ChangePasswordPayload>) => {
    ChangePassword({ email: user?.user?.email, ...values }, { onSuccess: () => resetForm() });
  };
  return (
    <Container>
      <Col md="12">
        <Card>
          <CommonCardHeader title="Change Password" />
          <CardBody>
            <div className="input-items">
              <Formik initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }} validationSchema={ChangePasswordSchema} onSubmit={handleSubmit}>
                {() => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="4">
                        <TextInput name="oldPassword" label="Old Password" type="password" placeholder=" * * * * * * * * * " required />
                      </Col>
                      <Col md="4">
                        <TextInput name="newPassword" label="New Password" type="password" placeholder=" * * * * * * * * * " required />
                      </Col>
                      <Col md="4">
                        <TextInput name="confirmPassword" label="Confirm Password" type="password" placeholder=" * * * * * * * * * " required />
                      </Col>
                      <Col sm="12" className="text-center">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isPending}>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default ChangePassword;
