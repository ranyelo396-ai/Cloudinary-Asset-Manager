import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  ShieldCheck, Thermometer, VolumeX, Wrench,
  ArrowRight, MapPin, Phone, Clock, ExternalLink,
  Users, Building, Award, ChevronRight, Star
} from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram } from "react-icons/si";
import { useProducts } from "@/hooks/use-products";
import { useBranches } from "@/hooks/use-branches";
import { useGallery } from "@/hooks/use-gallery";
import { useNews } from "@/hooks/use-news";
import heroImg from "@assets/WhatsApp_Image_2026-06-08_at_11.18.13_AM_1780953725946.jpeg";

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const { products } = useProducts();
  const { branches } = useBranches();
  const { gallery } = useGallery();
  const { news } = useNews();
  const [activeTab, setActiveTab] = useState("Todos");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const galleryTabs = ["Todos", "Ventanas", "Puertas", "Proyectos", "Instalaciones"];
  const filteredGallery = activeTab === "Todos"
    ? gallery
    : gallery.filter((g) => g.category === activeTab);

  const benefits = [
    { icon: ShieldCheck, title: "Alta resistencia", desc: "Materiales de calidad que garantizan durabilidad." },
    { icon: Thermometer, title: "Aislamiento térmico", desc: "Mantiene tus espacios frescos y eficientes." },
    { icon: VolumeX, title: "Aislamiento acústico", desc: "Disfruta de tranquilidad en cada ambiente." },
    { icon: Wrench, title: "Garantía de instalación", desc: "Instalación profesional y garantía por escrito." },
  ];

  const nosotrosStats = [
    { value: 20, suffix: "+", label: "Años de experiencia" },
    { value: 1500, suffix: "+", label: "Proyectos completados" },
    { value: 98, suffix: "%", label: "Clientes satisfechos" },
    { value: 100, suffix: "%", label: "Garantía en instalación" },
  ];

  const proyectosStats = [
    { value: 500, suffix: "+", label: "Hogares transformados" },
    { value: 300, suffix: "+", label: "Negocios y oficinas atendidas" },
    { value: 100, suffix: "%", label: "Compromiso con la calidad" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* ═══════════════════════════════════════════════════
          HERO — Split layout: text left / image right
      ════════════════════════════════════════════════════ */}
      <section id="inicio" className="pt-16 md:pt-18 min-h-[88vh] flex">
        <div className="w-full flex flex-col md:flex-row">

          {/* LEFT — Text content */}
          <div className="flex-1 md:max-w-[46%] bg-white flex items-center order-2 md:order-1">
            <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-0 max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label block mb-4">
                  Especialistas en PVC
                </span>

                <h1 className="hero-title text-foreground mb-5">
                  Ventanas y puertas que transforman tu hogar.
                </h1>

                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
                  Diseño, calidad y durabilidad en cada proyecto. Más de 20 años brindando soluciones
                  que combinan estética, confort y seguridad.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href="https://wa.me/50360707582"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="hero-cta-whatsapp"
                    className="btn-primary text-sm px-5 py-3"
                  >
                    <SiWhatsapp size={18} />
                    Cotiza tu proyecto
                  </a>
                  <a
                    href="#productos"
                    data-testid="hero-cta-products"
                    className="btn-outline-dark text-sm px-5 py-3"
                  >
                    Ver productos
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT — Hero image */}
          <div className="md:flex-1 relative h-64 sm:h-80 md:h-auto order-1 md:order-2 overflow-hidden">
            <img
              src="/images/hero.png"
              alt="Ventanas y puertas PVC INSTALUVI"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroImg; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent md:from-white/10" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BENEFITS BAR
      ════════════════════════════════════════════════════ */}
      <section className="bg-white py-0">
        <div className="instaluvi-container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border rounded-xl shadow-md -mt-6 md:-mt-10 bg-white relative z-10 overflow-hidden"
          >
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`flex items-start gap-3.5 p-5 md:p-6 ${
                    i < benefits.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
                  } ${i === 1 ? "border-r border-border md:border-r" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{b.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NOSOTROS
      ════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 md:py-24 bg-primary text-white overflow-hidden">
        <div className="instaluvi-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text + Stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Nosotros</span>
              <h2 className="section-title text-white">
                Más de{" "}
                <span className="text-[#60a5fa]">20 años</span>
                {" "}de experiencia
              </h2>
              <p className="text-white/70 leading-relaxed text-sm max-w-md">
                Somos una empresa familiar salvadoreña dedicada a la fabricación e instalación de
                ventanas y puertas de PVC. Nuestro compromiso es ofrecer productos de la más alta
                calidad, con un servicio personalizado y garantía en cada proyecto.
              </p>
              <a
                href="#contacto"
                className="btn-outline-white text-sm px-5 py-2.5 inline-flex items-center gap-2"
              >
                Conócenos más
                <ArrowRight size={16} />
              </a>

              {/* 2x2 Stats grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {nosotrosStats.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-xl p-4 text-center border border-white/10"
                  >
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-white/60 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden h-80 md:h-[480px] shadow-2xl"
            >
              <img
                src="/images/nosotros.png"
                alt="Instaluvi equipo y proyectos"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroImg; }}
              />
              <div className="absolute inset-0 bg-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCTOS
      ════════════════════════════════════════════════════ */}
      <section id="productos" className="py-20 md:py-24 bg-white">
        <div className="instaluvi-container">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="section-label block mb-2">Productos</span>
              <h2 className="section-title text-foreground max-w-sm">
                Soluciones diseñadas para cada espacio
              </h2>
            </div>
            <a
              href="#contacto"
              className="flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-3 transition-all"
            >
              Ver todos los productos
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Products grid — horizontal scroll on mobile */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-4 md:overflow-visible"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                data-testid={`product-card-${product.id}`}
                className="group flex-shrink-0 w-[75vw] sm:w-[55vw] md:w-auto bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Category icon badge */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                      <rect x="2" y="3" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 3v18M16 3v18M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-1.5 text-base leading-tight">{product.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href="#contacto"
                      className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Ver más
                      <ArrowRight size={14} />
                    </a>
                    <a
                      href={`https://wa.me/50360707582?text=Hola%20INSTALUVI%2C%20deseo%20cotizar%20el%20producto%3A%20${encodeURIComponent(product.title)}%20(ID%3A%20${product.id})`}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`btn-quote-${product.id}`}
                      className="w-8 h-8 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      title="Cotizar por WhatsApp"
                    >
                      <SiWhatsapp size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          GALERÍA
      ════════════════════════════════════════════════════ */}
      {gallery.length > 0 && (
        <section id="galeria" className="py-20 md:py-24 bg-gray-50">
          <div className="instaluvi-container">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Galería</span>
              <h2 className="section-title text-foreground">Nuestros Proyectos</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
                Explorá nuestros trabajos más recientes y encontrá inspiración para tu hogar u oficina.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 justify-center mb-8">
              {galleryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  data-testid={`gallery-tab-${tab}`}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    activeTab === tab
                      ? "bg-accent text-white border-accent shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filteredGallery.slice(0, 8).map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setLightboxImg(item.imageUrl)}
                  data-testid={`gallery-item-${item.id}`}
                  className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-semibold bg-white/20 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          PROYECTOS — Dark overlay stats
      ════════════════════════════════════════════════════ */}
      <section id="proyectos" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/nosotros.png"
            alt="Proyectos INSTALUVI"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroImg; }}
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        <div className="instaluvi-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white space-y-5"
            >
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Proyectos</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Cada{" "}
                <span className="text-[#60a5fa]">proyecto</span>
                {" "}cuenta una historia
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Hemos formado parte de hogares, oficinas y comercios en todo El Salvador, llevando
                calidad y confianza.
              </p>
              <a
                href="https://wa.me/50360707582"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Ver proyectos
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Right: 3 stats */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6"
            >
              {proyectosStats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-5 border-b border-white/20 pb-5 last:border-0 last:pb-0"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white min-w-[80px]">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/70 text-sm font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SUCURSALES
      ════════════════════════════════════════════════════ */}
      <section id="sucursales" className="py-20 md:py-24 bg-white">
        <div className="instaluvi-container">
          <div className="text-center mb-10">
            <span className="section-label block mb-2">Sucursales</span>
            <h2 className="section-title text-foreground">Estamos cerca de ti</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              Visitanos en cualquiera de nuestras ubicaciones y recibe asesoría personalizada.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {branches.map((branch, i) => (
              <motion.div
                key={branch.id}
                variants={fadeUp}
                data-testid={`branch-card-${branch.id}`}
                className="bg-gray-50 border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base mb-2">{branch.name}</h3>
                    <div className="space-y-1.5">
                      <p className="text-muted-foreground text-xs flex items-start gap-1.5">
                        <MapPin size={12} className="text-accent mt-0.5 flex-shrink-0" />
                        {branch.address}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                        <Phone size={12} className="text-accent flex-shrink-0" />
                        {branch.phone}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                        <Clock size={12} className="text-accent flex-shrink-0" />
                        {branch.hours}
                      </p>
                    </div>
                    {branch.mapUrl && (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-accent text-xs font-semibold hover:underline"
                      >
                        Ver en mapa
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NOVEDADES
      ════════════════════════════════════════════════════ */}
      {news.length > 0 && (
        <section id="novedades" className="py-20 bg-gray-50">
          <div className="instaluvi-container">
            <div className="text-center mb-10">
              <span className="section-label block mb-2">Novedades</span>
              <h2 className="section-title text-foreground">Últimas noticias</h2>
            </div>

            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {news.map((item, i) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-72 md:w-auto bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.imageUrl && (
                    <div className="h-40 overflow-hidden bg-secondary">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-sm mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
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
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="Gallery" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
