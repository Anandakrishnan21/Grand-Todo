"use client";
import React, { useState } from "react";
import { Button, DatePicker, Form, Modal, Select, TimePicker } from "antd";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Input from "antd/es/input/Input";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
dayjs.extend(customParseFormat);

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [assignee, setAssignee] = useState("Anandakrishnan");
  const [priority, setPriority] = useState("Low");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    form.resetFields();
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAssigneeChange = (value) => {
    setAssignee(value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setDescription(input);

    const timeRegex = /(\d{1,2})(am|pm)?/i;
    const match = input.match(timeRegex);

    if (match) {
      let hour = parseInt(match[1], 10);
      const period = match[2]?.toLowerCase();

      if (period === "pm" && hour !== 12) {
        hour += 12;
      } else if (period === "am" && hour === 12) {
        hour = 0;
      }

      const now = dayjs();
      let selectedTime = dayjs().hour(hour).minute(0).second(0);

      if (selectedTime.isBefore(now)) {
        setSelectedDate(dayjs().add(1, "day"));
      } else {
        setSelectedDate(dayjs());
      }
      setSelectedTime(selectedTime);
    }
  };

  const router = useRouter();

  const handleSubmit = async () => {
    const dueDate = selectedDate
      ? dayjs(selectedDate).format("DD-MM-YYYY")
      : null;
    const dueTime = selectedTime ? selectedTime.format("HH:mm:ss") : null;
    try {
      const res = await fetch("/api/today", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          date: dueDate,
          assignee,
          priority,
          due: dueTime,
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        router.push("/today");
        form.resetFields();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            assignee: assignee,
            priority: priority,
          }}
        >
          <div className="flex flex-col gap-2 p-3">
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Enter the description!",
                },
              ]}
            >
              <div>
                <p>Description</p>
                <Input placeholder="Task name" onChange={handleInput} />
              </div>
            </Form.Item>
            <div className="flex justify-between gap-2">
              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Select the date!",
                  },
                ]}
              >
                <DatePicker onChange={onDateChange} value={selectedDate} />
              </Form.Item>
              <Form.Item
                name="assignee"
                rules={[
                  {
                    required: true,
                    message: "Select an assignee!",
                  },
                ]}
              >
                <Select
                  style={{ width: 120 }}
                  onChange={handleAssigneeChange}
                  options={[
                    { value: "Anandakrishnan", label: "Anandakrishnan" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="priority"
                rules={[
                  {
                    required: true,
                    message: "select a priority!",
                  },
                ]}
              >
                <Select
                  style={{ width: 120 }}
                  onChange={handlePriorityChange}
                  options={[
                    { value: "Low", label: "Low" },
                    { value: "Medium", label: "Medium" },
                    { value: "High", label: "High" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="time">
                <TimePicker
                  onChange={onTimeChange}
                  value={selectedTime}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end gap-2 p-3">
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 px-2 rounded-md border-[1px] hover:border-blue-400 border-gray-200 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-1 px-2 rounded-md bg-blue-400 text-white active:shadow-[0_3px_10px_rgba(59,130,246,0.5)] transition-shadow duration-300 ease-in-out transform"
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddTask;
