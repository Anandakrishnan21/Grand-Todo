import RegistrationPageContent from "@/components/register/RegistrationPageContent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return (
    <div>
      <RegistrationPageContent />
    </div>
  );
}

export default RegisterPage;
