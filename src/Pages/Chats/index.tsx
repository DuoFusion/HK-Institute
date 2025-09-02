import { Fragment } from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

const Chats = () => {

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Chats" parent="Pages" />
      <Container fluid>
        <Row className="g-0">
          <Sidebar />
          <ChatWindow />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chats;
