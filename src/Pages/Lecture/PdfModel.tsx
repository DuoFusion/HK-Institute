import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ModalPassPropsType } from "../../Types/CoreComponents";

const PdfModel: FC<ModalPassPropsType> = ({ isModal, setModal, pdf }) => {
  const onCloseModal = () => {
    setModal(!isModal);
  };

  // Convert Google Drive /view link → /preview
  const pdfLink = pdf?.includes("/view") ? pdf.replace("/view", "/preview") : pdf;

  return (
    <Modal size="lg" centered isOpen={isModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Lecture PDF
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">{pdfLink ? <iframe title="pdf-viewer" src={pdfLink} width="100%" height="500" frameBorder="0" allow="autoplay; fullscreen" /> : <p className="text-center">No PDF available</p>}</div>
      </ModalBody>
    </Modal>
  );
};

export default PdfModel;
