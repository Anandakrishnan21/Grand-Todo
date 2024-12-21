import Group from "@/model/Group";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    await connection();
    const group = await Group.findById(id);
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json("error on fetch the group", error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    await connection();
    await Group.findByIdAndDelete(id);
    const group = await Group.find();
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return new Response("Error on deleting the group: " + error, {
      status: 500,
    });
  }
};
