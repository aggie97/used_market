import { Button, Modal } from "antd";
import { useState } from "react";

const AntdModal = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.children}
      </Button>
      <Modal
        title={`게시글 ${String(props.children)}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        게시글이 {props.children}되었습니다.
      </Modal>
    </>
  );
};

export default AntdModal;
