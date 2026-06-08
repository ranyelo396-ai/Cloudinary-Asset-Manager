import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import GalleryAdmin from "@/pages/admin/GalleryAdmin";
import BranchesAdmin from "@/pages/admin/BranchesAdmin";
import NewsAdmin from "@/pages/admin/NewsAdmin";
import PromotionsAdmin from "@/pages/admin/PromotionsAdmin";
import SettingsAdmin from "@/pages/admin/SettingsAdmin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />

      <Route path="/admin" component={() => <AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/products" component={() => <AdminLayout><ProductsAdmin /></AdminLayout>} />
      <Route path="/admin/gallery" component={() => <AdminLayout><GalleryAdmin /></AdminLayout>} />
      <Route path="/admin/branches" component={() => <AdminLayout><BranchesAdmin /></AdminLayout>} />
      <Route path="/admin/news" component={() => <AdminLayout><NewsAdmin /></AdminLayout>} />
      <Route path="/admin/promotions" component={() => <AdminLayout><PromotionsAdmin /></AdminLayout>} />
      <Route path="/admin/settings" component={() => <AdminLayout><SettingsAdmin /></AdminLayout>} />

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
