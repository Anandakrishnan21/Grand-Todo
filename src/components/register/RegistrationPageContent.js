"use client";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function RegistrationPageContent() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status === 201) {
        message.success("Registration successful!");
        router.push("/");
      } else {
        const data = await res.json();
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center p-2">
      <p className="text-lg font-medium mb-4">
        Welcome to <span className="font-bold text-red-500">Grand Todo</span>
      </p>
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input placeholder="Full Name" autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" type="email" autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" autoComplete="off" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <p className="text-sm mt-4">
          Have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPageContent;
