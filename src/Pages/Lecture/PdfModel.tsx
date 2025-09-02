import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ModalPassPropsType } from "../../Types/CoreComponents";

const PdfModel: FC<ModalPassPropsType> = ({ isModal, setModal, pdf }) => {
  const onCloseModal = () => {
    setModal(!isModal);
  };

  return (
    <Modal size="lg" centered isOpen={isModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Lecture PDF
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <iframe title="pdf-viewer" src={pdf} width="100%" height="500" frameBorder="0" allow="autoplay; fullscreen" />
      </ModalBody>
    </Modal>
  );
};

export default PdfModel;
