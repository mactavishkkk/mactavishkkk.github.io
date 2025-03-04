import { PenSquare } from "lucide-react";

import { type Offer } from "@/_types/offer";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { OfferForm } from "./offer-form";

interface Props {
  data: Offer;
}

export function UpdateOfferDialog({ data }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PenSquare className="siz-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da oferta</DialogTitle>
          <DialogDescription>
            Mantenha a sua oferta atualizada.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <OfferForm offerId={data.id} defaultValues={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
