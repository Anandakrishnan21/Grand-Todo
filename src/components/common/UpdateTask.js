import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function UpdateTask({ todayTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [task, setTask] = useState(todayTodo?.description || "");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (todayTodo) {
      setTask(todayTodo.description || "");
      setSelectedDate(
        todayTodo.date ? dayjs(todayTodo.date, "DD-MM-YYYY") : null
      );
      setSelectedTime(todayTodo.due ? dayjs(todayTodo.due, "HH:mm") : null);
    }
  }, [todayTodo]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const UpdateTask = {
      id: todayTodo._id,
      description: values.description,
      date: selectedDate ? selectedDate.format("DD-MM-YYYY") : todayTodo.date,
      due: selectedTime ? selectedTime.format("HH:mm") : todayTodo.due,
      assignee: values.assignee,
      priority: values.priority,
    };

    try {
      const res = await fetch("/api/today", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateTask),
      });

      if (res.ok) {
        setIsModalOpen(false);
        form.resetFields();
        message.success("Todo updated successfully");
      } else {
        message.error("Failed to update the todo");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="bg-[#87d068] text-sm flex justify-center px-3 border text-white rounded-md shadow-sm cursor-pointer"
        onClick={showModal}
      >
        <p>Edit</p>
      </div>
      <Modal open={isModalOpen} footer={null} onCancel={hideModal}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            description: task,
            assignee: todayTodo?.assignee || "",
            priority: todayTodo?.priority || "",
            description: todayTodo?.description || "",
            date: selectedDate,
            due: selectedTime,
          }}
        >
          <div className="flex flex-col gap-2 p-3">
            <Form.Item
              name="description2"
              rules={[
                {
                  required: true,
                  message: "Enter the description!",
                },
              ]}
            >
              <div>
                <p>Description</p>
                <Input
                  id="description2"
                  name="description2"
                  placeholder="Task name"
                  defaultValue={task}
                  autoComplete="off"
                />
              </div>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: false,
                },
              ]}
              name="tags"
            >
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="Select tags"
                // options={options}
              />
            </Form.Item>
            <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-2">
              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Select the date!",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
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
                <Select />
              </Form.Item>
              <Form.Item
                name="priority"
                rules={[
                  {
                    required: true,
                    message: "Select a priority!",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: "Low", label: "Low" },
                    { value: "Medium", label: "Medium" },
                    { value: "High", label: "High" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Select a time!",
                  },
                ]}
              >
                <TimePicker
                  style={{
                    width: "100%",
                  }}
                  value={selectedTime}
                  onChange={setSelectedTime}
                  format="HH:mm"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end gap-2 p-3">
            <button
              type="button"
              onClick={hideModal}
              className="p-1 px-2 rounded-md border-[1px] hover:border-blue-400 border-gray-200 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`p-1 px-2 rounded-md bg-blue-400 text-white ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              } active:shadow-[0_3px_10px_rgba(59,130,246,0.5)] transition-shadow duration-300 ease-in-out transform`}
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateTask;
