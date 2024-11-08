import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

// delete todo based on the id
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    await connection();
    await Todo.findByIdAndDelete(id);
    const todo = await Todo.find();
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new Response("Error on deleting the todo: " + error, {
      status: 500,
    });
  }
};

// update todo based on the id
export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const {
      description,
      tags,
      date,
      priority,
      status,
      assignee,
      startTime,
      endTime,
    } = await req.json();

    await connection();

    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        description,
        tags,
        date,
        priority,
        status,
        assignee,
        startTime,
        endTime,
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updateTodo), { status: 200 });
  } catch (error) {
    return new NextResponse("Error on updating the todo: " + error, {
      status: 500,
    });
  }
};
