import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Image as ImageIcon, MapPin, Tag } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useGallery } from "@/hooks/use-gallery";
import { useBranches } from "@/hooks/use-branches";
import { usePromotions } from "@/hooks/use-promotions";

export default function Dashboard() {
  const { products } = useProducts();
  const { gallery } = useGallery();
  const { branches } = useBranches();
  const { promotions } = usePromotions();

  const stats = [
    { title: "Productos Activos", value: products.length, icon: Package },
    { title: "Imágenes en Galería", value: gallery.length, icon: ImageIcon },
    { title: "Sucursales", value: branches.length, icon: MapPin },
    { title: "Promociones Activas", value: promotions.length, icon: Tag },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Resumen general del sitio web INSTALUVI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
