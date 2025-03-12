"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface UpdateOfferDTO {
  id: string;
  title: string;
  originalPrice: number;
  offerPrice: number;
  category: string;
  description: string;
  isActive: boolean;
}

export async function updateOffer(data: UpdateOfferDTO) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Não autorizado.");
  }

  const newOffer = {
    title: data.title,
    originalPrice: data.originalPrice,
    offerPrice: data.offerPrice,
    description: data.description,
    category: data.category,
    isActive: data.isActive,
  };

  await fetch(`http://localhost:3333/offers/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOffer),
  });

  revalidatePath("/app");
}
