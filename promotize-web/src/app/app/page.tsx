import { CreateOfferDialog } from "@/components/general/app/create-offer-dialog";
import { OffersTable } from "./components/offers-table";

export default function AppPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between pt-5">
        <h1 className="font-heading text-foreground text-md font-bold">
          Minhas ofertas
        </h1>

        <CreateOfferDialog />
      </div>

      <OffersTable />
    </div>
  );
}
