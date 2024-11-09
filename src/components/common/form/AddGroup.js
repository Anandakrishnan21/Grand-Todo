import { Button, Modal } from "antd";
import { Plus } from "lucide-react";
import React, { useState } from "react";

function AddGroup() {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const handleModal = () => {
    SetIsModalOpen(true);
  };

  const handleOk = () => {
    SetIsModalOpen(false);
  };

  const handleCancel = () => {
    SetIsModalOpen(false);
  };

  return (
    <>
      <Button icon={<Plus size={16} />} onClick={handleModal}>
        Create group
      </Button>
      <Modal
        title="Create Group"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="h-40 flex justify-center items-center">
          <h1 className="font-semibold text-2xl">Coming Soon</h1>
        </div>
      </Modal>
    </>
  );
}

export default AddGroup;
