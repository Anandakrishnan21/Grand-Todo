"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPageContent = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res.ok) {
        message.success("Login successfully!");
        router.replace("/home");
      } else {
        message.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred during login.");
      console.error(error);
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
            name="email"
            rules={[
              {
                type: "email",
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="w-full justify-start">
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPageContent;
