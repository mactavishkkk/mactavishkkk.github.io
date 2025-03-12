"use client";

import { useState } from "react";

import { Tag } from "lucide-react";

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

export function CreateOfferDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green hover:bg-green/90">
          <Tag className="size-4" />
          Nova oferta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova oferta</DialogTitle>
          <DialogDescription>
            Publique uma nova oferta e comece a vender agora mesmo.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <OfferForm closeDialog={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
