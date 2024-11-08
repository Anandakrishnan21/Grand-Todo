import Todo from "@/model/Todo";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

// get todo at a limit of 3
export const GET = async (req, { params }) => {
  const { limit } = params;
  try {
    await connection();
    const todo = await Todo.find({}).sort({ createdAt: -1 }).limit(limit);
    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "Error on fetching todo:" + error + { status: 500 }
    );
  }
};
