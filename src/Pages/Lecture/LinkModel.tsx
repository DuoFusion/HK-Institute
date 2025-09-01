import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ModalPassPropsType } from "../../Types/CoreComponents";
import Iframe from "react-iframe";

const LinkModel: FC<ModalPassPropsType> = ({ isModal, setModal, link }) => {
  const onCloseModal = () => {
    setModal(!isModal);
  };
  console.log(link);

  return (
    <Modal size="lg" centered isOpen={isModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Lecture Video
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <iframe title="drive-player" src="https://drive.google.com/file/d/1KSpTSiSuyB-yi1Ypw6x6zESAW3Wum-Tx/preview" width={`100%`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" />
          <Iframe url={link} width="640px" height="320px" display="block" position="relative" />
          <iframe title="drive-player" src={link} width={`100%`} height={`400`} frameBorder="0" sandbox="allow-scripts allow-forms" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LinkModel;
