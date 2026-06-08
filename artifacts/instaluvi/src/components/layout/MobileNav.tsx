import { Home, Package, Newspaper, Image as ImageIcon, Phone } from "lucide-react";
import { useState } from "react";

const tabs = [
  { label: "Inicio", href: "#inicio", icon: Home },
  { label: "Productos", href: "#productos", icon: Package },
  { label: "Novedades", href: "#novedades", icon: Newspaper },
  { label: "Galería", href: "#galeria", icon: ImageIcon },
  { label: "Contacto", href: "#contacto", icon: Phone },
];

export function MobileNav() {
  const [active, setActive] = useState("Inicio");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.label;
          return (
            <a
              key={tab.label}
              href={tab.href}
              onClick={() => setActive(tab.label)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full py-2 transition-all"
              data-testid={`mobile-nav-${tab.label.toLowerCase()}`}
            >
              <div className={`relative flex items-center justify-center w-8 h-7 rounded-full transition-all duration-200 ${
                isActive ? "bg-accent/10" : ""
              }`}>
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-gray-400"
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-200 leading-none ${
                isActive ? "text-accent" : "text-gray-400"
              }`}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
