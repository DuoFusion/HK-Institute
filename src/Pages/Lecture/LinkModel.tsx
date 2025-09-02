import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ModalPassPropsType } from "../../Types/CoreComponents";

const LinkModel: FC<ModalPassPropsType> = ({ isModal, setModal, link }) => {
  const onCloseModal = () => {
    setModal(!isModal);
  };

  return (
    <Modal size="lg" centered isOpen={isModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Lecture Video
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <div className="input-items">
          <iframe title="drive-player" src={link} width={`100%`} height={`500`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LinkModel;
