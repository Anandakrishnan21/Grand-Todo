import Group from "@/model/Group";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { limit } = params;
  try {
    await connection();
    const group = await Group.find().sort({ createdAt: -1 }).limit(limit);
    return new NextResponse(JSON.stringify(group), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "Error on fetching group" + error + { status: 500 }
    );
  }
};
