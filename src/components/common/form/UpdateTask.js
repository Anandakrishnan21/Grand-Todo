import { DatePicker, Form, Input, message, Select, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlusIcon } from "lucide-react";

function UpdateTask({ todayTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [task, setTask] = useState(todayTodo?.description || "");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const format = "HH:mm";

  useEffect(() => {
    if (form && todayTodo) {
      setTask(todayTodo.description || "");
      setSelectedDate(
        todayTodo.date ? dayjs(todayTodo.date, "DD-MM-YYYY") : null
      );
      setSelectedTimeRange([
        todayTodo.startTime ? dayjs(todayTodo.startTime, format) : null,
        todayTodo.endTime ? dayjs(todayTodo.endTime, format) : null,
      ]);
      form.setFieldsValue({
        description: todayTodo.description,
        date: todayTodo.date ? dayjs(todayTodo.date, "DD-MM-YYYY") : null,
        time: [
          todayTodo.startTime ? dayjs(todayTodo.startTime, format) : null,
          todayTodo.endTime ? dayjs(todayTodo.endTime, format) : null,
        ],
      });
    }
  }, [todayTodo, form]);

  const onTimeChange = (times) => {
    setSelectedTimeRange(times);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9 ()\[\],\-=/]/g, "");
    setTask(input);
    form.setFieldsValue({ description: input });

    const timeRegex = /(\d{1,2})(am|pm)?/i;
    const match = input.match(timeRegex);

    if (match) {
      let hours = parseInt(match[1], 10);
      let period = match[2]?.toLowerCase();

      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;

      const selectedTime = dayjs().hour(hours).minute(0).second(0);
      const dateForTomorrow = dayjs().add(1, "day");

      const finalDate = selectedTime.isBefore(dayjs())
        ? dateForTomorrow
        : dayjs();

      setSelectedDate(finalDate);
      form.setFieldsValue({
        date: finalDate,
      });
    }
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const UpdateTask = {
      id: todayTodo._id,
      description: values.description,
      tags: values.tags ? values.tags.join(" ") : "",
      date: selectedDate ? selectedDate.format("DD-MM-YYYY") : todayTodo.date,
      startTime: selectedTimeRange[0]
        ? selectedTimeRange[0].format(format)
        : todayTodo.startTime,
      endTime: selectedTimeRange[1]
        ? selectedTimeRange[1].format(format)
        : todayTodo.endTime,
      assignee: values.assignee,
      priority: values.priority,
    };

    try {
      const res = await fetch(`/api/today/${todayTodo._id}`, {
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
        window.location.reload();
      } else {
        message.error("Failed to update the todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      message.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const options = [
    { label: "#Food", value: "#Food" },
    { label: "#study", value: "#study" },
    { label: "#sleep", value: "#sleep" },
    { label: "#workout", value: "#workout" },
    { label: "#work", value: "#work" },
    { label: "#practice", value: "#practice" },
    { label: "#happy", value: "#happy" },
  ];

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent style={{ zIndex: 1050 }} className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update the task</DialogTitle>
        </DialogHeader>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            description: task,
            assignee: todayTodo?.assignee || "",
            priority: todayTodo?.priority || "",
          }}
        >
          <div className="flex flex-col gap-2 p-3">
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Enter the description!" }]}
            >
              <Input
                placeholder="Task name"
                id="task"
                value={task}
                autoComplete="off"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="tags">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select tags"
                options={options}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              />
            </Form.Item>
            <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-2">
              <Form.Item
                name="date"
                rules={[{ required: true, message: "Select the date!" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </Form.Item>
              <Form.Item
                name="assignee"
                rules={[{ required: true, message: "Select an assignee!" }]}
              >
                <Select />
              </Form.Item>
              <Form.Item
                name="priority"
                rules={[{ required: true, message: "Select a priority!" }]}
              >
                <Select
                  options={[
                    { value: "Low", label: "Low" },
                    { value: "Medium", label: "Medium" },
                    { value: "High", label: "High" },
                  ]}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                />
              </Form.Item>
              <Form.Item
                name="time"
                rules={[{ required: true, message: "Select a time range!" }]}
              >
                <TimePicker.RangePicker
                  style={{ width: "100%" }}
                  onChange={onTimeChange}
                  value={selectedTimeRange}
                  format={format}
                />
              </Form.Item>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-500 hover:bg-blue-400 hover:duration-300 transition-colors"
            >
              Update
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask;
