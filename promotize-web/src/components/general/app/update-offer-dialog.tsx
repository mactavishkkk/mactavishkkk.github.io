"use client";

import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <OfferForm
            offerId={data.id}
            defaultValues={data}
            closeDialog={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
