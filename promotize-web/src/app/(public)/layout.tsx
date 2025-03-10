import { Header } from "@/components/general/public/header";

export default function PublicLayout({
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
