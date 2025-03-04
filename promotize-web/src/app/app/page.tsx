import { EllipsisVertical, Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AppPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between pt-5">
        <h1 className="font-heading text-foreground text-md font-bold">
          Minhas ofertas
        </h1>

        <Button className="bg-green hover:bg-green/90">
          <Plus className="size-4" />
          Nova oferta
        </Button>
      </div>

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
          <TableRow>
            <TableCell className="font-medium">Oferta 2</TableCell>
            <TableCell className="text-muted-foreground gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
              </div>
            </TableCell>
            <TableCell>
              <Badge className="bg-green font-bold">Ativa</Badge>
            </TableCell>
            <TableCell className="text-right font-medium">R$ 130</TableCell>
            <TableCell>
              <Button size="icon" variant="ghost">
                <EllipsisVertical className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Oferta 2</TableCell>
            <TableCell className="text-muted-foreground gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
              </div>
            </TableCell>
            <TableCell>
              <Badge className="bg-green font-bold">Ativa</Badge>
            </TableCell>
            <TableCell className="text-right font-medium">R$ 130</TableCell>
            <TableCell>
              <Button size="icon" variant="ghost">
                <EllipsisVertical className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Oferta 2</TableCell>
            <TableCell className="text-muted-foreground gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
                <Badge variant="outline">Categoria 1</Badge>
              </div>
            </TableCell>
            <TableCell>
              <Badge className="bg-green font-bold">Ativa</Badge>
            </TableCell>
            <TableCell className="text-right font-medium">R$ 130</TableCell>
            <TableCell>
              <Button size="icon" variant="ghost">
                <EllipsisVertical className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
