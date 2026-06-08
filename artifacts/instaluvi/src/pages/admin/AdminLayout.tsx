import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { LogOut, LayoutDashboard, Package, Image as ImageIcon, MapPin, Newspaper, Tag, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!user) {
    return null; // The auth hook should already redirect to /login
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Productos", href: "/admin/products", icon: Package },
    { label: "Galería", href: "/admin/gallery", icon: ImageIcon },
    { label: "Sucursales", href: "/admin/branches", icon: MapPin },
    { label: "Noticias", href: "/admin/news", icon: Newspaper },
    { label: "Promociones", href: "/admin/promotions", icon: Tag },
    { label: "Ajustes", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">INSTALUVI</h2>
          <p className="text-xs opacity-70 uppercase tracking-wider">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}>
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-white/10 hover:text-white" onClick={logout}>
            <LogOut size={20} className="mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
