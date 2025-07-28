import { Modal } from "react-bootstrap";

const SidebarModal = ({
  show,
  onHide,
  children,
  title = "Filters",
  itemCount = 0,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="sidebar-modal"
      centered
      backdrop={true}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title} {itemCount ? `(${itemCount})` : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default SidebarModal;
