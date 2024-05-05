import Footer from "./footer";
import Header from "./header";

export default async function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-col grow mt-[65px] overflow-y-auto">
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
