import { type Offer } from "@/_types/offer";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import { UpdateOfferDialog } from "@/components/general/app/update-offer-dialog";

import { formatCurrency } from "@/utils/format-currency";

interface Props {
  data: Offer;
}

export function OfferRow({ data }: Props) {
  return (
    <TableRow>
      <TableCell className="font-semibold">{data.title}</TableCell>
      <TableCell className="text-muted-foreground gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Categoria 1</Badge>
          <Badge variant="outline">Categoria 1</Badge>
          <Badge variant="outline">Categoria 1</Badge>
        </div>
      </TableCell>
      <TableCell>
        {data.active ? (
          <Badge className="bg-green font-bold">Ativa</Badge>
        ) : (
          <Badge variant="secondary">Inativa</Badge>
        )}
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(data.amount)}
      </TableCell>
      <TableCell>
        <UpdateOfferDialog data={data} />
      </TableCell>
    </TableRow>
  );
}
