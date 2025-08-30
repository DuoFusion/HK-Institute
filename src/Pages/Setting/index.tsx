import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../Api";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";
import { ImageUpload, TextInput } from "../../CoreComponents/formFields";
import { useAppSelector } from "../../ReduxToolkit/Hooks";
import { SettingSchema } from "../../Utils/ValidationSchemas";
import { SettingFormValues } from "../../Types";

const Setting = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { data: Setting } = Queries.useGetSetting(user?.user?._id);
  const { mutate, isPending } = Mutations.useSetting();

  const initialData = Setting?.data;

  const initialValues: SettingFormValues = {
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    email: initialData?.email ?? "",
    phoneNumber: initialData?.phoneNumber ?? "",
    image: initialData?.image ? [initialData.image] : [],
  };

  const handleSubmit = async (values: SettingFormValues, { resetForm }: FormikHelpers<SettingFormValues>) => {
    const payload = {
      ...(values.email && { email: values.email }),
      ...(values.firstName && { firstName: values.firstName }),
      ...(values.lastName && { lastName: values.lastName }),
      ...(values.phoneNumber && { phoneNumber: values.phoneNumber }),
      ...(values.image?.length && { image: values.image[0] }),
    };
    mutate({ id: initialData?._id, ...payload }, { onSuccess: () => resetForm() });
  };

  return (
    <Container>
      <Col md="12">
        <Card>
          <CommonCardHeader title="Setting" />
          <CardBody>
            <div className="input-items">
              <Formik initialValues={initialValues} validationSchema={SettingSchema} onSubmit={handleSubmit} enableReinitialize>
                {() => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="12" className="text-center input-box profile-image">
                        <ImageUpload name="image" label="Image" isListType="picture-circle" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="firstName" label="first Name" type="text" placeholder="Enter your first name" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="lastName" label="last Name" type="text" placeholder="Enter your last name" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="email" label="email" type="email" placeholder="Enter your email address" required disabled />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="tel" placeholder="Enter your phone number" required />
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

export default Setting;
