"use client";
import React, { useState } from "react";
import { DatePicker, Form, message, Select, TimePicker } from "antd";
import Input from "antd/es/input/Input";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
dayjs.extend(customParseFormat);

const GroupForm = ({ group, id }) => {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const format = "HH:mm";
  const router = useRouter();

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTimeChange = (times) => {
    setSelectedTimeRange(times);
  };

  const handleInput = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9 ()\[\],\-=/]/g, "");
    setDescription(input);

    const timeRegex = /(\d{1,2})(am|pm)?/i;
    const match = input.match(timeRegex);

    if (match) {
      let hour = parseInt(match[1], 10);
      let period = match[2]?.toLowerCase();

      if (period === "pm" && hour !== 12) hour += 12;
      if (period === "am" && hour === 12) hour = 0;

      const selectedTime = dayjs().hour(hour).minute(0).second(0);
      const dateForTomorrow = dayjs().add(1, "day");

      const finalDate = selectedTime.isBefore(dayjs())
        ? dateForTomorrow
        : dayjs();

      form.setFieldsValue({
        date: finalDate,
      });
    }
  };

  const handleSubmit = async (values) => {
    const { description, tags, assignee, priority } = values;
    const dueDate = selectedDate ? selectedDate.format("DD-MM-YYYY") : null;
    const startTime = selectedTimeRange
      ? selectedTimeRange[0].format("HH:mm")
      : null;
    const endTime = selectedTimeRange
      ? selectedTimeRange[1].format("HH:mm")
      : null;
    const notificationTime = selectedTimeRange
      ? selectedTimeRange[0].subtract(1, "hour").format("HH:mm")
      : null;

    const groupMembers = group.map((item) => item.members).flat();

    const formattedMembers = groupMembers.map((member) => ({
      email: member,
      progress: "todo",
    }));

    try {
      const res = await fetch("/api/groupTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          tags: tags ? tags.join(" ") : "",
          date: dueDate,
          assignee,
          priority,
          groupId: id,
          startTime,
          endTime,
          notificationTime,
          members: formattedMembers,
        }),
      });

      if (res.ok) {
        router.refresh();
        form.resetFields();
        message.success("Task added successfully!");
      } else {
        const data = await res.json();
        message.error(data.message || "Failed to add task!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form. Please try again.");
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

  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <CirclePlusIcon size="20" />
            Add task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Create a group task</DialogTitle>
          </DialogHeader>
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              assignee: session?.user?.name,
              priority: "Low",
            }}
            layout="vertical"
          >
            <div className="flex flex-col gap-2 p-3">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Enter the description!" }]}
              >
                <Input
                  id="description"
                  name="description"
                  placeholder="Task name"
                  value={description}
                  autoComplete="off"
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item label="Tags" name="tags">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select the Tags"
                  options={options}
                />
              </Form.Item>

              <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-2">
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: "Select the date!" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={onDateChange}
                    value={selectedDate ? dayjs(selectedDate) : null}
                  />
                </Form.Item>

                <Form.Item
                  label="Assignee"
                  name="assignee"
                  rules={[{ required: true, message: "Select an assignee!" }]}
                >
                  <Select />
                </Form.Item>

                <Form.Item
                  label="Priority"
                  name="priority"
                  rules={[{ required: true, message: "Select a priority!" }]}
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
                  label="Time"
                  name="time"
                  rules={[{ required: true, message: "Select a time!" }]}
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
                Submit
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupForm;
