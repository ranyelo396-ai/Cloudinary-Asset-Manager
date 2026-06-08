import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sucursales", href: "#sucursales" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="instaluvi-container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                  <rect x="2" y="3" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 8h20M8 3v18M16 3v18" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg text-primary leading-none tracking-tight">instaluvi</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium leading-none mt-0.5">
                  Especialistas en PVC
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    activeSection === link.href.slice(1)
                      ? "text-accent"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                  onClick={() => setActiveSection(link.href.slice(1))}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/50360707582"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                data-testid="header-cta"
              >
                <SiWhatsapp size={16} />
                Cotiza ahora
              </a>
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 px-4 text-base font-medium text-foreground border-b border-border hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/50360707582"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-md transition-colors text-base"
            >
              <SiWhatsapp size={20} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
