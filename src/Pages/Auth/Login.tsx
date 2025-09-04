import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Form, Formik } from "formik";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../Api";
import { RouteList } from "../../Constant/RouteList";
import { TextInput } from "../../CoreComponents/formFields";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { login } from "../../ReduxToolkit/Slice/AuthSlice";
import { LoginPayload } from "../../Types/Auth";
import { LoginSchema } from "../../Utils/ValidationSchemas";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: Login, isPending } = Mutations.useLogin();
  const handleSubmit = async (values: LoginPayload) => {
    Login(values, {
      onSuccess: (response) => {
        dispatch(login(response?.data));
        navigate(RouteList.Dashboard);
      },
    });
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div className="login-main">
                <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
                  {() => (
                    <Form>
                      <h3>Login</h3>
                      <p>Enter your Email Id & Password to login</p>

                      <TextInput label="email address" name="email" type="email" placeholder="rarex49098@firain.com" />
                      <TextInput name="password" label="password" type="password" placeholder=" * * * * * * * * * " />

                      <div className="text-end mt-3">
                        <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={isPending}>
                          Login
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
