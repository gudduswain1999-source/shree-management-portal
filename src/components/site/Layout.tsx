import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-primary text-primary-foreground border-b-4 border-gold">
      <div className="container-academic py-14 md:py-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-3 text-primary-foreground/80 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
