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
      <p className="text-lg font-medium mb-4">
        Welcome to <span className="font-bold text-red-500">Grand Todo</span>
      </p>
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              type="email"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                type: "password",
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" autoComplete="off" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPageContent;
