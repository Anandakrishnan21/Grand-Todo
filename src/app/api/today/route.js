import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { description, tags, date, assignee, priority, due } =
      await req.json();
    await connection();
    await Todo.create({ description, tags, date, assignee, priority, due });
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
    const { id, description, tags, date, assignee, priority, due } =
      await req.json();
    await connection();
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { description, tags, date, assignee, priority, due },
      { new: true }
    );
    return new NextResponse.json(
      { message: "Todo updated successfully", todo: updateTodo },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in update data" + error, { status: 500 });
  }
};
