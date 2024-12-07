import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connection } from "@/utils/db";
import Group from "@/model/Group";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { group, members, color, admin } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    await connection();

    const groups = await Group.create({
      group,
      members,
      email,
      admin,
      color,
    });

    return NextResponse.json(
      { message: "Group added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connection();
    const group = await Group.find();
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
