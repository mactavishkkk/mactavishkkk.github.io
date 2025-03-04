import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut, Store } from "lucide-react";

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

export async function UserMenu() {
  const user = await currentUser();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar className="size-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem className="py-2">
                <Store className="size-4" />
                <span>Empresa</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem className="group p-2">
              <LogOut className="group-hover:text-danger text-muted-foreground size-4" />
              <span className="text-muted-foreground group-hover:text-danger">
                Sair
              </span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompanyDialog />
    </Dialog>
  );
}
