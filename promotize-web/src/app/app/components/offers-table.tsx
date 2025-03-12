import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OfferRow } from "./offer-row";

import { getUserOffers } from "@/actions/data-layer/get-user-offers";

export async function OffersTable() {
  const { offers } = await getUserOffers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Oferta</TableHead>
          <TableHead className="w-80">Categorias</TableHead>
          <TableHead className="w-44">Status</TableHead>
          <TableHead className="w-44"></TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer) => (
          <OfferRow key={offer.id} data={offer} />
        ))}
      </TableBody>
    </Table>
  );
}
