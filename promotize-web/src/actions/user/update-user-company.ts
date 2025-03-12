"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { UserCompany } from "@/_types/user-company";

export async function updateUserCompany(data: UserCompany) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Não autorizado.");
  }

  const companyData = {
    companyName: data.companyName,
    companyDescription: data.companyDescription,
  };

  await fetch(`http://localhost:3333/users/${user.id}/company`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData),
  });

  revalidatePath("/app");
}
