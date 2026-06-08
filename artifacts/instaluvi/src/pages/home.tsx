import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ShieldCheck, Thermometer, VolumeX, Wrench, ArrowRight, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useProducts } from "@/hooks/use-products";
import { useBranches } from "@/hooks/use-branches";
import { useGallery } from "@/hooks/use-gallery";
import { useNews } from "@/hooks/use-news";
import refImage from "@assets/WhatsApp_Image_2026-06-08_at_11.18.13_AM_1780953725946.jpeg";

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const BENEFITS = [
  { icon: ShieldCheck, title: "Alta resistencia", desc: "Materiales de calidad que garantizan durabilidad." },
  { icon: Thermometer, title: "Aislamiento térmico", desc: "Mantiene tus espacios frescos y eficientes." },
  { icon: VolumeX, title: "Aislamiento acústico", desc: "Disfruta de tranquilidad en cada ambiente." },
  { icon: Wrench, title: "Garantía de instalación", desc: "Instalación profesional y garantía por escrito." },
];

const STATS_NOSOTROS = [
  { v: 20, s: "+", label: "Años de experiencia" },
  { v: 1500, s: "+", label: "Proyectos completados" },
  { v: 98, s: "%", label: "Clientes satisfechos" },
  { v: 100, s: "%", label: "Garantía en instalación" },
];

const STATS_PROJECTS = [
  { v: 500, s: "+", label: "Hogares transformados" },
  { v: 300, s: "+", label: "Negocios y oficinas atendidas" },
  { v: 100, s: "%", label: "Compromiso con la calidad" },
];

export default function Home() {
  const { products } = useProducts();
  const { branches } = useBranches();
  const { gallery } = useGallery();
  const { news } = useNews();
  const [activeTab, setActiveTab] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const GALLERY_TABS = ["Todos", "Ventanas", "Puertas", "Proyectos", "Instalaciones"];
  const filteredGallery = activeTab === "Todos" ? gallery : gallery.filter(g => g.category === activeTab);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════
          HERO — Split: text LEFT / image RIGHT
      ══════════════════════════════════════════════════ */}
      <section id="inicio" className="pt-16 flex flex-col md:flex-row" style={{ minHeight: "88vh" }}>

        {/* LEFT — white text panel */}
        <div className="w-full md:w-[45%] bg-white flex items-center order-2 md:order-1">
          <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-0 w-full max-w-xl">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-label block mb-4">Especialistas en PVC</span>
              <h1 className="hero-title text-foreground mb-5 leading-[1.08]">
                Ventanas y puertas que transforman tu hogar.
              </h1>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-sm">
                Diseño, calidad y durabilidad en cada proyecto. Más de 20 años brindando soluciones
                que combinan estética, confort y seguridad.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="https://wa.me/50360707582"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-[14px] px-5 py-[11px]"
                >
                  <SiWhatsapp size={17} />
                  Cotiza tu proyecto
                </a>
                <a
                  href="#productos"
                  className="btn-outline-dark text-[14px] px-5 py-[11px]"
                >
                  Ver productos
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — panoramic image */}
        <div className="w-full md:flex-1 relative h-[55vw] md:h-auto min-h-[260px] order-1 md:order-2 overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Ventanas y puertas PVC de alta calidad"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = refImage; }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BENEFITS BAR — floating card
      ══════════════════════════════════════════════════ */}
      <section className="bg-white pb-10">
        <div className="instaluvi-container">
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-xl shadow-md bg-white overflow-hidden -mt-6 md:-mt-12 relative z-10"
          >
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i} variants={fadeUp}
                  className={`flex items-start gap-3 p-5 md:p-6 ${i % 2 === 0 && i !== 2 ? "border-r border-b border-border md:border-b-0" : ""} ${i === 1 ? "border-b border-border md:border-b-0 md:border-r" : ""} ${i === 2 ? "border-r border-border md:border-r" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-[13px] text-foreground leading-tight">{b.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NOSOTROS — dark blue
      ══════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 md:py-24 bg-primary text-white">
        <div className="instaluvi-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="space-y-6">
              <span className="text-accent text-[11px] font-semibold uppercase tracking-widest">Nosotros</span>
              <h2 className="section-title text-white leading-tight">
                Más de <span className="text-[#60a5fa]">20 años</span> de experiencia
              </h2>
              <p className="text-white/70 text-[14px] leading-relaxed max-w-md">
                Somos una empresa familiar salvadoreña dedicada a la fabricación e instalación de ventanas
                y puertas de PVC. Nuestro compromiso es ofrecer productos de la más alta calidad, con un
                servicio personalizado y garantía en cada proyecto.
              </p>
              <a href="#contacto" className="btn-outline-white text-[13px] px-5 py-[10px] inline-flex items-center gap-2">
                Conócenos más <ArrowRight size={15} />
              </a>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {STATS_NOSOTROS.map((s, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter target={s.v} suffix={s.s} />
                    </div>
                    <div className="text-[11px] text-white/55 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative rounded-2xl overflow-hidden h-72 md:h-[460px] shadow-2xl">
              <img src="/images/nosotros.png" alt="Equipo INSTALUVI" className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = refImage; }} />
              <div className="absolute inset-0 bg-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PRODUCTOS
      ══════════════════════════════════════════════════ */}
      <section id="productos" className="py-20 md:py-24 bg-white">
        <div className="instaluvi-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="section-label block mb-2">Productos</span>
              <h2 className="section-title text-foreground max-w-xs">Soluciones diseñadas para cada espacio</h2>
            </div>
            <a href="#contacto" className="flex items-center gap-1.5 text-accent text-[13px] font-semibold hover:gap-3 transition-all">
              Ver todos los productos <ArrowRight size={15} />
            </a>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {products.map((p) => (
              <motion.div key={p.id} variants={fadeUp}
                className="group flex-shrink-0 w-[72vw] sm:w-[50vw] md:w-auto bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                  <div className="absolute bottom-3 left-3 w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                      <rect x="2" y="3" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 3v18M16 3v18M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-[14px] mb-1.5 leading-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-[12px] leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <a href="#contacto" className="text-accent text-[13px] font-semibold flex items-center gap-1 hover:gap-2 transition-all">Ver más <ArrowRight size={13} /></a>
                    <a href={`https://wa.me/50360707582?text=Hola%20INSTALUVI%2C%20deseo%20cotizar%3A%20${encodeURIComponent(p.title)}`}
                      target="_blank" rel="noreferrer"
                      className="w-8 h-8 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <SiWhatsapp size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALERÍA
      ══════════════════════════════════════════════════ */}
      {gallery.length > 0 && (
        <section id="galeria" className="py-20 md:py-24 bg-gray-50">
          <div className="instaluvi-container">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Galería</span>
              <h2 className="section-title text-foreground">Nuestros Proyectos</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 justify-center mb-8">
              {GALLERY_TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-medium border transition-all ${activeTab === tab ? "bg-accent text-white border-accent" : "bg-white text-muted-foreground border-border hover:border-accent hover:text-accent"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredGallery.slice(0, 8).map((item, i) => (
                <div key={item.id} onClick={() => setLightbox(item.imageUrl)}
                  className={`relative overflow-hidden rounded-lg cursor-pointer group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                  style={{ aspectRatio: "1/1" }}>
                  <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-[11px] font-semibold bg-white/20 px-2 py-1 rounded">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          PROYECTOS — dark overlay section
      ══════════════════════════════════════════════════ */}
      <section id="proyectos" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/nosotros.png" alt="" className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = refImage; }} />
          <div className="absolute inset-0 bg-primary/88" />
        </div>
        <div className="instaluvi-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-white space-y-5">
              <span className="text-accent text-[11px] font-semibold uppercase tracking-widest">Proyectos</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Cada <span className="text-[#60a5fa]">proyecto</span> cuenta una historia
              </h2>
              <p className="text-white/65 text-[14px] leading-relaxed max-w-sm">
                Hemos formado parte de hogares, oficinas y comercios en todo El Salvador, llevando calidad y confianza.
              </p>
              <a href="https://wa.me/50360707582" target="_blank" rel="noreferrer" className="btn-primary text-[13px] px-5 py-[11px] inline-flex items-center gap-2">
                Ver proyectos <ArrowRight size={15} />
              </a>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-6">
              {STATS_PROJECTS.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-5 border-b border-white/15 pb-5 last:border-0 last:pb-0">
                  <div className="text-4xl md:text-5xl font-bold text-white min-w-[80px]">
                    <AnimatedCounter target={s.v} suffix={s.s} />
                  </div>
                  <div className="text-white/65 text-[13px] font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SUCURSALES
      ══════════════════════════════════════════════════ */}
      <section id="sucursales" className="py-20 md:py-24 bg-white">
        <div className="instaluvi-container">
          <div className="text-center mb-10">
            <span className="section-label block mb-2">Sucursales</span>
            <h2 className="section-title text-foreground">Estamos cerca de ti</h2>
            <p className="text-muted-foreground text-[13px] mt-2 max-w-md mx-auto">
              Visitanos en cualquiera de nuestras ubicaciones y recibí asesoría personalizada.
            </p>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map(branch => (
              <motion.div key={branch.id} variants={fadeUp}
                className="bg-gray-50 border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-[14px] mb-2">{branch.name}</h3>
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground text-[12px] flex items-start gap-1.5"><MapPin size={11} className="text-accent mt-0.5 flex-shrink-0" />{branch.address}</p>
                      <p className="text-muted-foreground text-[12px] flex items-center gap-1.5"><Phone size={11} className="text-accent flex-shrink-0" />{branch.phone}</p>
                      <p className="text-muted-foreground text-[12px] flex items-center gap-1.5"><Clock size={11} className="text-accent flex-shrink-0" />{branch.hours}</p>
                    </div>
                    {branch.mapUrl && (
                      <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="mt-2.5 inline-flex items-center gap-1 text-accent text-[12px] font-semibold hover:underline">
                        Ver en mapa <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NOVEDADES
      ══════════════════════════════════════════════════ */}
      {news.length > 0 && (
        <section id="novedades" className="py-20 bg-gray-50">
          <div className="instaluvi-container">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Novedades</span>
              <h2 className="section-title text-foreground">Últimas noticias</h2>
            </div>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {news.map(item => (
                <div key={item.id} className="flex-shrink-0 w-72 md:w-auto bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {item.imageUrl && (
                    <div className="h-40 bg-secondary overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-[13px] mb-2 leading-tight">{item.title}</h3>
                    <p className="text-muted-foreground text-[12px] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <MobileNav />
      <WhatsAppButton />

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light leading-none">×</button>
        </div>
      )}
    </div>
  );
}
