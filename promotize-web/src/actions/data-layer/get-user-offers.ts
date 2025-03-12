"use server";

import { Offer } from "@/_types/offer";
import { currentUser } from "@clerk/nextjs/server";

interface Response {
  offers: Offer[];
}

export async function getUserOffers(): Promise<Response> {
  const user = await currentUser();

  const data = await fetch(`http://localhost:3333/users/${user?.id}/offers`);
  const { offers } = await data.json();

  return { offers };
}
