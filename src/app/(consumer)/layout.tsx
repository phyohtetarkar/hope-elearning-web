import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main
        className="flex-grow-1"
        style={{
          padding: "70px 0 0 0",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
