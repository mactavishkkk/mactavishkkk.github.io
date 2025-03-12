import "./globals.css";

import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { SyncUserWithFirestore } from "@/components/general/sync-user-with-firestore";

const montserrat = Montserrat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const dmsans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Promotize",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmsans.variable} ${montserrat.variable}`}>
        <body className="antialiased">
          <SyncUserWithFirestore />
          {children}
          <Toaster richColors theme="light" position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
