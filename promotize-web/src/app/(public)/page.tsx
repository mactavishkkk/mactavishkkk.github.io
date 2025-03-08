import { offersMock as offers } from "@/mock-data/offers-mock";
import { OfferItem } from "./components/offer-item";
import { FiltersForm } from "./components/filters-form";

export default async function Home() {
  return (
    <div className="grid grid-cols-12 gap-10 pt-5 pb-10">
      <div className="col-span-12">
        <FiltersForm />
      </div>

      <div className="col-span-12 flex flex-col gap-5">
        <h1 className="font-heading text-foreground mb-2 text-2xl font-bold">
          Ofertas
        </h1>

        {offers.map((offer) => (
          <OfferItem key={offer.id} data={offer} />
        ))}
      </div>
    </div>
  );
}
