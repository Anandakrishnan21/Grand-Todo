"use client";
import { Button, ColorPicker, Form, Input, message, Modal } from "antd";
import { Plus, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AddGroup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const color = values.color;
    try {
      const res = await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group: values.group,
          members: values.members,
          color,
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        router.push("/group");
        form.resetFields();
        message.success("Group added successfully!");
      } else {
        const data = await res.json();
        message.error(data.message || "Failed to add group!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <Button icon={<Plus size={16} />} onClick={handleModal}>
        Create group
      </Button>
      <Modal
        title="Create Group"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ color: "#a0a0a0" }}
        >
          <div className="flex flex-col gap-2 p-3">
            <Form.Item
              name="group"
              rules={[{ required: true, message: "Enter the group name" }]}
            >
              <div>
                <p>Group name</p>
                <Input placeholder="Group name" autoComplete="off" />
              </div>
            </Form.Item>
            <Form.List name="members" initialValue={[""]}>
              {(fields, { add, remove }) => (
                <>
                  <p>Group members</p>
                  {fields.map(({ key, name, fieldKey }) => (
                    <div
                      key={key}
                      className="w-full flex flex-cols items-center gap-2"
                    >
                      <Form.Item
                        name={name}
                        className="w-full"
                        fieldKey={fieldKey}
                        rules={[
                          { required: true, message: "Enter a member's email" },
                        ]}
                      >
                        <Input
                          placeholder="Enter the member's email"
                          suffix={
                            fields.length > 1 ? (
                              <CircleX
                                size={16}
                                onClick={() => remove(name)}
                                className="cursor-pointer"
                              />
                            ) : null
                          }
                        />
                      </Form.Item>
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    style={{
                      width: "50%",
                    }}
                    onClick={() => add()}
                    icon={<Plus size={16} />}
                  >
                    Add Member
                  </Button>
                </>
              )}
            </Form.List>
            <Form.Item
              name="color"
              rules={[{ required: true, message: "Please select a color!" }]}
            >
              <div>
                <p>Choose the color theme</p>
                <ColorPicker
                  format="hex"
                  value={form.getFieldValue("color")}
                  onChange={(newColor) => {
                    const hexColor = newColor.toHexString();
                    form.setFieldValue("color", hexColor);
                  }}
                />
              </div>
            </Form.Item>
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
}

export default AddGroup;