import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/model/User";

export const POST = async (req) => {
  try {
    const {
      description,
      tags,
      date,
      assignee,
      priority,
      startTime,
      endTime,
      status,
    } = await req.json();

    console.log({
      description,
      tags,
      date,
      assignee,
      priority,
      startTime,
      endTime,
    });

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    console.log("User email:", email);

    await connection();

    const todo = await Todo.create({
      email,
      description,
      tags,
      date,
      assignee,
      priority,
      startTime,
      endTime,
      status,
    });

    console.log("Task Created:", todo);

    return NextResponse.json({ message: "Todo added" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connection();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });
    const todo = await Todo.find({ email: user.email });
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data" + error, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    await connection();
    await Todo.findByIdAndDelete(id);
    const todo = await Todo.find();
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in deleting data" + error, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const {
      id,
      description,
      tags,
      date,
      assignee,
      priority,
      startTime,
      endTime,
      status,
    } = await req.json();

    await connection();

    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        description,
        tags,
        date,
        assignee,
        priority,
        startTime,
        endTime,
        status,
      },
      { new: true }
    );

    if (!updateTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo updated successfully", todo: updateTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update data:", error);
    return NextResponse.json(
      { message: "Error in update data", error: error.message },
      { status: 500 }
    );
  }
};
