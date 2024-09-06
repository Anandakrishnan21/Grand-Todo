import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { description, date, assignee, priority, due } = await req.json();
    await connection();
    await Todo.create({ description, date, assignee, priority, due });
    return NextResponse.json({ message: "todo added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connection();
    const todo = await Todo.find();
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching data" + error, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connection();
    await Todo.findByIdAndDelete();
    const todo = await Todo.find();
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in deleting data" + error, { status: 500 });
  }
};
