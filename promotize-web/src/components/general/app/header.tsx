import Link from "next/link";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/general/app/user-menu";

export function Header() {
  return (
    <div className="bg-background/80 border-border sticky top-0 z-50 flex w-full border-b px-5 py-8 backdrop-blur-sm md:py-0">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-5">
        <Link href="/">
          <Image src={logo} alt="Promotize Logo" width={160} />
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
    </div>
  );
}
