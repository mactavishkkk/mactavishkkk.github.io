import { Laptop, Tag } from "lucide-react";

import { type Offer } from "@/_types/offer";

import { formatCurrency } from "@/utils/format-currency";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  data: Offer;
}

export function OfferItem({ data }: Props) {
  return (
    <div className="flex items-center gap-6 rounded-md border bg-white p-5 shadow-sm">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-lg font-bold">{data.title}</h1>

        <span className="text-muted-foreground line-clamp-2">
          {data.description}
        </span>

        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline">
            <Laptop className="size-3" />
            Tecnologia
          </Badge>

          <span className="text-muted-foreground text-sm">
            Anunciado por{" "}
            <span className="text-foreground font-semibold">TechMax</span>
          </span>
        </div>
      </div>

      <Separator orientation="vertical" />

      <div className="flex w-52 flex-col items-center justify-center">
        <span className="font-heading mb-3 text-2xl font-bold">
          {formatCurrency(data.amount)}
        </span>
        <Button size="lg" className="bg-green hover:bg-green/90 w-full">
          Ver oferta
          <Tag className="size-4" />
        </Button>
      </div>
    </div>
  );
}
