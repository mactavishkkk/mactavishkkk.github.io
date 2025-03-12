"use server";

import { revalidatePath } from "next/cache";

export async function deleteOffer(offerId: string) {
  await fetch(`http://localhost:3333/offers/${offerId}`, {
    method: "DELETE",
  });

  revalidatePath("/app");
}
