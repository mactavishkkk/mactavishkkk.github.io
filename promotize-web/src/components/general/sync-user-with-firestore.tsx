"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { syncUserFirestore } from "@/actions/user/sync-user";

export function SyncUserWithFirestore() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await syncUserFirestore({
          clerkId: user.id,
          name: user.fullName!,
          email: user.emailAddresses[0].emailAddress,
        });
        console.log("user conectado");
      } catch (error) {
        console.error("Error sync user", error);
      }
    };

    syncUser();
  }, [user]);

  return null;
}
