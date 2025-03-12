import { type Offer } from "@/_types/offer";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import { UpdateOfferDialog } from "@/components/general/app/update-offer-dialog";

import { formatCurrency } from "@/utils/format-currency";
import { categories } from "@/utils/category-list";

interface Props {
  data: Offer;
}

export function OfferRow({ data }: Props) {
  const icon = categories.find((item) => item.name === data.category)?.icon;
  return (
    <TableRow>
      <TableCell className="font-semibold">{data.title}</TableCell>
      <TableCell className="text-muted-foreground gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {/* <Laptop className="size-3" /> */}
            {icon}
            {data.category}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        {data.isActive ? (
          <Badge className="bg-green font-bold">Ativa</Badge>
        ) : (
          <Badge variant="secondary">Inativa</Badge>
        )}
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(data.offerPrice)}
      </TableCell>
      <TableCell>
        <UpdateOfferDialog data={data} />
      </TableCell>
    </TableRow>
  );
}
