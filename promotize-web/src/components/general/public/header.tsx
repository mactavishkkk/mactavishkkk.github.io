import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader2Icon, LogIn, Tag } from "lucide-react";

import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";

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
        <SignedOut>
          <SignInButton forceRedirectUrl="/app">
            <Button variant="default" className="bg-green hover:bg-green/90">
              Entrar
              <LogIn className="size-4" />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/app">
            <Button variant="default" className="bg-green hover:bg-green/90">
              Painel
              <Tag className="size-4" />
            </Button>
          </Link>
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}
