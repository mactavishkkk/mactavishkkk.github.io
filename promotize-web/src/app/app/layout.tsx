import { Header } from "@/components/general/app/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col gap-5">
      <Header />
      <div className="mx-auto h-full w-full max-w-[1240px] px-5">
        {children}
      </div>
    </div>
  );
}
