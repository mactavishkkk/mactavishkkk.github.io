import { Header } from "@/components/general/public/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-8 md:py-0">
      <Header />
      {children}
    </div>
  );
}
