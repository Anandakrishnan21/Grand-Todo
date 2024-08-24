import React, { useState } from "react";
import { DatePicker, Modal, Select, TimePicker } from "antd";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Input from "antd/es/input/Input";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const AddTask = () => {
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
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Link
        href="#"
        className="flex items-start font-bold text-sm text-blue-500 gap-4 p-2"
        onClick={showModal}
      >
        <PlusCircle size={20} />
        Add Todo
      </Link>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col gap-2 p-3">
          <div>
            <Input placeholder="Task name" />
            <p>Description</p>
          </div>
          <div className="flex justify-between gap-2">
            <DatePicker onChange={onChange} />
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
            <TimePicker
              onChange={onChange}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddTask;
