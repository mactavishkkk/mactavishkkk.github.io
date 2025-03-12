"use server";

import { Offer } from "@/_types/offer";

interface FetchOffersDTO {
  search?: string;
  category?: string;
}

interface Response {
  offers: Offer[];
}

export async function fetchOffers({
  search,
  category,
}: FetchOffersDTO): Promise<Response> {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }
  console.log(`http://localhost:3333/offers?${params.toString()}`);
  const data = await fetch(`http://localhost:3333/offers?${params.toString()}`);
  const { offers } = await data.json();

  return { offers };
}
