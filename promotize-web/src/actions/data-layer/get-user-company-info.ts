"use server";

import { UserCompany } from "@/_types/user-company";
import { currentUser } from "@clerk/nextjs/server";

interface Response {
  company: UserCompany;
}

export async function getUserCompanyInfo(): Promise<Response> {
  const user = await currentUser();

  const data = await fetch(`http://localhost:3333/users/${user?.id}/company`);
  const { company } = await data.json();

  return { company };
}
