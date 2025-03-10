"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { categories } from "@/utils/category-list";

const formSchema = z.object({
  title: z.string(),
  category: z.string(),
});

export function FiltersForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 items-end gap-5"
      >
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesquisar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="O que você está buscando hoje ?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                        <span className="ml-1 font-medium">
                          {category.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-5">
          <Button type="submit" variant="secondary">
            <Filter className="size-4" />
            Filtrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
