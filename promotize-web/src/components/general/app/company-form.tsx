"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateUserCompany } from "@/actions/user/update-user-company";

import { UserCompany } from "@/_types/user-company";

import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "Fale algo sobre a empresa.",
  }),
});

interface Props {
  defaultValues?: UserCompany;
}

export function CompanyForm({ defaultValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.companyName ?? "",
      description: defaultValues?.companyDescription ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateUserCompany({
        companyName: values.name,
        companyDescription: values.description,
      });

      toast.success("Alterações salvas", {
        description: "Os dados da empresa foram atualizados.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar informações da empresa.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da empresa..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte um pouco sobre a empresa..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Salvar
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
