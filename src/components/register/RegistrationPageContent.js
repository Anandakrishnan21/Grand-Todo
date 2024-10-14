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
      <p>
        Welcome to <span className="font-bold text-red-500">Grand Todo</span>
      </p>
      <div className="w-[100%] md:w-[50%] px-4">
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <div>
              <p>Username</p>
              <Input placeholder="Full Name" />
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <div>
              <p>Email</p>
              <Input placeholder="Email" type="email" />
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <div>
              <p>Password</p>
              <Input.Password placeholder="Password" />
            </div>
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
        <p className="w-full justify-start">
          Have an account ? <Link href="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPageContent;
