import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { LogOut, LayoutDashboard, Package, Image as ImageIcon, MapPin, Newspaper, Tag, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Productos", href: "/admin/products", icon: Package },
  { label: "Galería", href: "/admin/gallery", icon: ImageIcon },
  { label: "Sucursales", href: "/admin/branches", icon: MapPin },
  { label: "Noticias", href: "/admin/news", icon: Newspaper },
  { label: "Promociones", href: "/admin/promotions", icon: Tag },
  { label: "Ajustes", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-gray-500 font-medium">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside className={`${mobile ? "w-full" : "w-64 hidden md:flex"} bg-primary text-white flex-col h-full flex flex-shrink-0`}>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
              <rect x="2" y="3" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 8h20M8 3v18M16 3v18" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-sm leading-none">instaluvi</div>
            <div className="text-[9px] uppercase tracking-widest text-white/50 mt-0.5">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                  isActive ? "bg-white/20 font-semibold text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="px-3 py-2 mb-2">
          <div className="text-xs text-white/50 truncate">{user.email}</div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-primary">
            <Sidebar mobile />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Menu size={20} />
          </button>
          <span className="font-bold text-sm text-primary">INSTALUVI Admin</span>
          <div className="w-8" />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
