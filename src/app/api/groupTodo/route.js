import { connection } from "@/utils/db";
import { NextResponse } from "next/server";
import GroupTodo from "@/model/GroupTodo";

// post method for creating a new todo
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
      notificationTime,
      members,
      progress
    } = await req.json();

    await connection();

    const todo = await GroupTodo.create({
      description,
      tags,
      date,
      assignee,
      priority,
      startTime,
      endTime,
      status,
      notificationTime,
      members,
      progress
    });

    return NextResponse.json({ message: "Todo added" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// get method to retrieve all todo
export const GET = async (req) => {
  try {
    await connection();

    const todo = await GroupTodo.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data" + error, { status: 500 });
  }
};
