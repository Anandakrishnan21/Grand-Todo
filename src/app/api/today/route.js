import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/model/User";

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
    } = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

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
      notificationTime,
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
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });
    const todo = await Todo.find({ email: user.email }).sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data" + error, { status: 500 });
  }
};
