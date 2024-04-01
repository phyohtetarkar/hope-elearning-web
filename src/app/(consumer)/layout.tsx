import { Footer, Header } from "@/components/template/consumer";

export default function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
