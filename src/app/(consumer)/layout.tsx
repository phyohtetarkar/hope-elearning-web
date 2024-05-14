import Footer from "./footer";
import Header from "./header";

export default async function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      <div className="fixed inset-0 top-[65px] overflow-y-auto">
        <div className="flex flex-col h-full">
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
