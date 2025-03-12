"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface OfferDTO {
  title: string;
  originalPrice: number;
  offerPrice: number;
  category: string;
  description: string;
  isActive: boolean;
}

export async function createOffer(data: OfferDTO) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Não autorizado.");
  }

  const newOffer = {
    title: data.title,
    originalPrice: data.originalPrice,
    offerPrice: data.offerPrice,
    category: data.category,
    description: data.description,
    isActive: data.isActive,
    ownerId: user.id,
  };

  await fetch("http://localhost:3333/offers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOffer),
  });

  revalidatePath("/app");
}
