import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";

// Minimal components for admin views
function Products() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Gestión de Productos</h1><p className="text-muted-foreground">Administre el catálogo de productos.</p></div></div>; }
function Gallery() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Galería de Imágenes</h1><p className="text-muted-foreground">Administre las imágenes de proyectos y productos.</p></div></div>; }
function Branches() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Sucursales</h1><p className="text-muted-foreground">Administre la información de las sucursales.</p></div></div>; }
function News() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Noticias y Novedades</h1><p className="text-muted-foreground">Administre las publicaciones y novedades.</p></div></div>; }
function Promotions() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Promociones</h1><p className="text-muted-foreground">Gestione las promociones activas en el sitio.</p></div></div>; }
function Settings() { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Ajustes del Sitio</h1><p className="text-muted-foreground">Configuración de contacto y redes sociales.</p></div></div>; }

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" component={() => <AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/products" component={() => <AdminLayout><Products /></AdminLayout>} />
      <Route path="/admin/gallery" component={() => <AdminLayout><Gallery /></AdminLayout>} />
      <Route path="/admin/branches" component={() => <AdminLayout><Branches /></AdminLayout>} />
      <Route path="/admin/news" component={() => <AdminLayout><News /></AdminLayout>} />
      <Route path="/admin/promotions" component={() => <AdminLayout><Promotions /></AdminLayout>} />
      <Route path="/admin/settings" component={() => <AdminLayout><Settings /></AdminLayout>} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
