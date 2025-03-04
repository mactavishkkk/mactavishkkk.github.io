import Link from "next/link";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/general/app/user-menu";

export function Header() {
  return (
    <div className="flex items-center justify-between py-2">
      <Link href="/">
        <Image src={logo} alt="Promotize Logo" width={150} />
      </Link>

      <ClerkLoading>
        <Button variant="default" disabled>
          <Loader2Icon className="size-4 animate-spin" />
        </Button>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}
