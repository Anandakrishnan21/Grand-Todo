import Group from "@/model/Group";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connection();
    const group = await Group.findById(id);
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json("error on fetch the group", error);
  }
};
