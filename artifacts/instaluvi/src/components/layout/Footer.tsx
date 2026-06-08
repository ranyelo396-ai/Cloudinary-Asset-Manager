import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { UserCheck, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto">
      {/* ─── CTA Strip ─── */}
      <div className="bg-accent py-5 md:py-6">
        <div className="instaluvi-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Headline */}
            <div className="text-center md:text-left">
              <p className="text-white font-semibold text-base leading-tight">
                ¿Tienes un proyecto en mente?
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Estamos listos para hacerlo realidad.
              </p>
            </div>

            {/* Middle: 2 features */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <UserCheck size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">Atención personalizada</div>
                  <div className="text-white/60 text-[10px]">Te asesoramos en cada paso.</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">Cotización sin compromiso</div>
                  <div className="text-white/60 text-[10px]">Rápida, gratuita y sin obligación.</div>
                </div>
              </div>
            </div>

            {/* Right: WhatsApp button */}
            <a
              href="https://wa.me/50360707582"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp-cta"
              className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm shadow-md"
            >
              <SiWhatsapp size={18} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Footer ─── */}
      <div className="bg-primary text-white pt-14 pb-8">
        <div className="instaluvi-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                    <rect x="2" y="3" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 8h20M8 3v18M16 3v18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg leading-none">instaluvi</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/50 mt-0.5">Especialistas en PVC</div>
                </div>
              </div>
              <p className="text-white/60 text-xs leading-relaxed max-w-[200px]">
                Transformando hogares y negocios en El Salvador con soluciones PVC de la más alta calidad.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/share/1CLdnaFaV9/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-social-facebook"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <SiFacebook size={15} />
                </a>
                <a
                  href="https://www.instagram.com/instaluvi_elsalvador"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-social-instagram"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <SiInstagram size={15} />
                </a>
                <a
                  href="https://wa.me/50360707582"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-social-whatsapp"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                >
                  <SiWhatsapp size={15} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Navegación</h4>
              <ul className="space-y-2.5 text-xs text-white/60">
                {["Inicio", "Nosotros", "Productos", "Galería", "Sucursales", "Contacto"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Productos</h4>
              <ul className="space-y-2.5 text-xs text-white/60">
                {["Ventanas Corredizas", "Ventanas Abatibles", "Puertas Corredizas", "Puertas de PVC"].map((p) => (
                  <li key={p}>
                    <a href="#productos" className="hover:text-white transition-colors">{p}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white">Contacto</h4>
              <ul className="space-y-2.5 text-xs text-white/60">
                <li>Tel: +503 6070-7582</li>
                <li>El Salvador</li>
                <li className="pt-1">
                  <a
                    href="https://www.facebook.com/share/1CLdnaFaV9/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/instaluvi_elsalvador"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} INSTALUVI. Todos los derechos reservados.</p>
            <p>Fabricación e instalación de ventanas y puertas PVC en El Salvador</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
