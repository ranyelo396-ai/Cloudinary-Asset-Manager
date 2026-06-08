import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className={`font-bold text-2xl tracking-tight ${scrolled ? "text-primary" : "text-white"}`}>
            INSTALUVI
          </span>
          <span className={`text-[0.65rem] uppercase tracking-wider font-medium ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
            Especialistas en PVC
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Inicio", "Nosotros", "Productos", "Proyectos", "Sucursales", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="https://wa.me/50360707582" target="_blank" rel="noreferrer">
              Cotizar Ahora
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
