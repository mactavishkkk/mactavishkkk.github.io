import { OfferItem } from "./components/offer-item";
import { FiltersForm } from "./components/filters-form";

import { fetchOffers } from "@/actions/data-layer/fetch-offers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;
  const { offers } = await fetchOffers({ search, category });

  const foundOffers = offers.length;

  return (
    <div className="grid grid-cols-12 gap-10 pt-5 pb-10">
      <div className="col-span-12">
        <FiltersForm />
      </div>

      <div className="col-span-12 flex flex-col gap-5">
        <div className="mb-2">
          <h1 className="font-heading text-foreground text-2xl font-bold">
            Ofertas
          </h1>

          {foundOffers > 0 && (
            <span className="text-muted-foreground text-sm">
              {foundOffers} oferta{foundOffers > 1 && "s"} encontrada
              {foundOffers > 1 && "s"}
            </span>
          )}
        </div>

        {offers.map((offer) => (
          <OfferItem key={offer.id} data={offer} />
        ))}

        {offers.length === 0 && (
          <div>Nenhum resultado encontrado para a sua busca...</div>
        )}
      </div>
    </div>
  );
}
