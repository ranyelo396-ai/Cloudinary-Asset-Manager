import { Home, Grid, Image as ImageIcon, MapPin, Mail } from "lucide-react";

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white border-t z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        <a href="#inicio" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Home size={20} />
          <span className="text-[10px] mt-1 font-medium">Inicio</span>
        </a>
        <a href="#productos" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Grid size={20} />
          <span className="text-[10px] mt-1 font-medium">Productos</span>
        </a>
        <a href="#proyectos" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <ImageIcon size={20} />
          <span className="text-[10px] mt-1 font-medium">Galería</span>
        </a>
        <a href="#sucursales" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <MapPin size={20} />
          <span className="text-[10px] mt-1 font-medium">Sucursales</span>
        </a>
        <a href="#contacto" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Mail size={20} />
          <span className="text-[10px] mt-1 font-medium">Contacto</span>
        </a>
      </div>
    </div>
  );
}
