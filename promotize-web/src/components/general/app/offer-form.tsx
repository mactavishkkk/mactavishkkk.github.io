"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { createOffer } from "@/actions/offer/create-offer";
import { updateOffer } from "@/actions/offer/update-offer";

import { Offer } from "@/_types/offer";
import { deleteOffer } from "@/actions/offer/delete-offer";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/category-list";

interface Props {
  offerId?: string;
  defaultValues?: Offer;
  closeDialog: () => void;
}

const formSchema = z.object({
  title: z.string(),
  originalPrice: z.coerce.number(),
  offerPrice: z.coerce.number(),
  category: z.string(),
  description: z.string(),
  isActive: z.boolean().default(false),
});

export function OfferForm({ defaultValues, offerId, closeDialog }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      category: "",
      description: "",
      originalPrice: 0,
      offerPrice: 0,
      isActive: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!offerId) {
        await createOffer(values);
        form.reset();
        toast.success("Oferta criada com sucesso!");
      } else {
        await updateOffer({
          ...values,
          id: offerId,
        });
        toast.success("Oferta atualizada com sucesso!");
      }

      closeDialog();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao salvar alterações");
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteOffer(offerId!);

      toast.success("Oferta deletada com sucesso!");

      setIsDeleting(false);
      closeDialog();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar oferta");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oferta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe um título para a oferta..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtre por categoria de produtos" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.name}
                      value={category.name}
                      className="h-12 px-3"
                    >
                      {category.icon}
                      <span className="ml-1 font-medium">{category.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço original (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço na oferta (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte um pouco sobre a oferta..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Ativar oferta</FormLabel>
                <FormDescription>
                  Ao ativar oferta, ela ficará disponível para todos.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          {offerId && (
            <Button
              type="button"
              variant="ghost"
              className="mr-auto"
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Trash className="size-4" />
                  Excluir oferta
                </>
              )}
            </Button>
          )}

          {form.formState.isSubmitting ? (
            <Button disabled={form.formState.isSubmitting}>
              <Loader2 className="size-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
