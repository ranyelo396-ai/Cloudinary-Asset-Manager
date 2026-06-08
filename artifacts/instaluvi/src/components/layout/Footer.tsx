import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8" id="contacto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-2xl tracking-tight">INSTALUVI</h3>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/80">Especialistas en PVC</p>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              Transformando hogares y negocios en El Salvador con soluciones de PVC de la más alta calidad y durabilidad.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#productos" className="hover:text-white transition-colors">Productos</a></li>
              <li><a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Contacto</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Teléfono: +503 6070-7582</li>
              <li>El Salvador</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Síguenos</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1CLdnaFaV9/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <SiFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/instaluvi_elsalvador" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <SiInstagram size={20} />
              </a>
              <a href="https://wa.me/50360707582" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <SiWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} INSTALUVI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
