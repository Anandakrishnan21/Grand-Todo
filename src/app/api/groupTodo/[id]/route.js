import GroupTodo from "@/model/GroupTodo";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const updateFields = await req.json();

    await connection();

    const groupTodo = await GroupTodo.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!groupTodo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(groupTodo), { status: 200 });
  } catch (error) {
    console.error("Error updating todo:", error);
    return new NextResponse("Error updating todo: " + error.message, {
      status: 500,
    });
  }
};
