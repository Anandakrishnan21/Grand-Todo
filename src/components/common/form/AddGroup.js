"use client";
import { ColorPicker, Form, Input, message } from "antd";
import { Plus, CircleX, CirclePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AddGroup() {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group: values.group,
          members: values.members,
          admin: session?.user?.name,
          color: values.color,
        }),
      });

      if (res.ok) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlusIcon size="20" />
          Create group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
        </DialogHeader>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ color: "#1677ff", members: [""] }}
          layout="vertical"
        >
          <Form.Item
            label="Group name"
            name="group"
            rules={[{ required: true, message: "Enter the group name" }]}
          >
            <Input placeholder="Group name" autoComplete="off" />
          </Form.Item>

          <Form.List name="members">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey }) => (
                  <Form.Item
                    key={key}
                    label={key === 0 ? "Group members" : ""}
                    name={name}
                    fieldKey={fieldKey}
                    rules={[
                      { required: true, message: "Enter a member's email" },
                    ]}
                  >
                    <div className="flex items-center gap-2">
                      <Input placeholder="Member's email" />
                      {fields.length > 1 && (
                        <CircleX
                          size={16}
                          onClick={() => remove(name)}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </Form.Item>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => add()}
                  icon={<Plus size={16} />}
                >
                  Add Member
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Theme"
            name="color"
            rules={[{ required: true, message: "Please select a color!" }]}
          >
            <ColorPicker
              defaultValue="#1677ff"
              format="hex"
              onChange={(newColor) =>
                form.setFieldValue("color", newColor.toHexString())
              }
              showText
              allowClear
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            />
          </Form.Item>

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
  );
}

export default AddGroup;
