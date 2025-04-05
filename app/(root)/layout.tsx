import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // This layout is used for all pages in the app
  return (
    <main className="font-work sans">
      <Navbar />
      {children}
    </main>
  );
}
