import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut, Store, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CompanyDialog } from "./company-dialog";

import { UserCompany } from "@/_types/user-company";

interface Props {
  additionalInfo: {
    company: UserCompany;
  };
}

export async function UserMenu({ additionalInfo }: Props) {
  const user = await currentUser();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar className="size-10">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-3">
              <User className="size-4" />
              <span className="ml-2">Meu Perfil</span>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="p-3">
                <Store className="size-4" />
                <span className="ml-2">Minha Empresa</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem className="group p-3">
              <LogOut className="group-hover:text-danger text-muted-foreground size-4" />
              <span className="group-hover:text-danger ml-2">Sair</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompanyDialog data={additionalInfo.company} />
    </Dialog>
  );
}
