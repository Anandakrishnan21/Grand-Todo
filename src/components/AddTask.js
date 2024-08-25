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
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setDescription(input);

    const timeRegex = /(\d{1,2})(am|pm)?/i;
    const match = input.match(timeRegex);

    if (match) {
      let hour = parseInt(match[1], 10);
      let period = match[2]?.toLowercase();

      if (period == "pm" && hour != 12) {
        hour += 12;
      } else if (period == "pm" && hour === 12) {
        hour = 0;
      }

      const day = dayjs();
      let selectedTime = dayjs().hour(hour).minute(0).second(0);
      
      if (selectedTime.isBefore(day)) {
        setSelectedDate(dayjs().add(1, "day"));
      } else {
        setSelectedDate(dayjs());
      }
      setSelectedTime(selectedTime);
    }
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
            <Input placeholder="Task name" onChange={handleInput} />
            <p>Description</p>
          </div>
          <div className="flex justify-between gap-2">
            <DatePicker onChange={onDateChange} value={selectedDate} />
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
            <Select
              defaultValue="Low"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
            />
            <TimePicker
              onChange={onTimeChange}
              value={selectedTime}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddTask;
