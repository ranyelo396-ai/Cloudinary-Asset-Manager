import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Thermometer, VolumeX, Wrench, Building, Home as HomeIcon, Award, MapPin } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useBranches } from "@/hooks/use-branches";
import { useGallery } from "@/hooks/use-gallery";
import { useNews } from "@/hooks/use-news";
import { SiWhatsapp } from "react-icons/si";
import { useState } from "react";
import refImage from "@assets/WhatsApp_Image_2026-06-08_at_11.18.13_AM_1780953725946.jpeg";

export default function Home() {
  const { products } = useProducts();
  const { branches } = useBranches();
  const { gallery } = useGallery();
  const { news } = useNews();
  const [activeGalleryTab, setActiveGalleryTab] = useState("Todos");

  const galleryCategories = ["Todos", "Ventanas", "Puertas", "Proyectos", "Instalaciones"];
  const filteredGallery = activeGalleryTab === "Todos" 
    ? gallery 
    : gallery.filter(item => item.category === activeGalleryTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section id="inicio" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Instaluvi Hero" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = refImage; }}
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 px-4 text-center mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight"
          >
            Ventanas y puertas que transforman tu hogar.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Diseño, calidad y durabilidad en cada proyecto. Más de 20 años brindando soluciones que combinan estética, confort y seguridad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 text-lg h-14 px-8" asChild>
              <a href="https://wa.me/50360707582" target="_blank" rel="noreferrer">
                <SiWhatsapp size={24} />
                Contactar por WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary text-lg h-14 px-8" asChild>
              <a href="#productos">Ver Productos</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: "Alta resistencia" },
              { icon: Thermometer, label: "Aislamiento térmico" },
              { icon: VolumeX, label: "Aislamiento acústico" },
              { icon: Wrench, label: "Garantía de instalación" }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <benefit.icon size={32} />
                </div>
                <span className="font-semibold text-foreground">{benefit.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold">Más de 20 años de experiencia</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Somos una empresa familiar salvadoreña dedicada a la fabricación e instalación de ventanas y puertas de PVC. Nuestro compromiso es entregar proyectos impecables, con atención al detalle y materiales de la más alta calidad.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary mt-4">
                Conocernos más
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative w-full"
            >
              <img src="/images/nosotros.png" alt="Equipo Instaluvi" className="rounded-xl shadow-2xl object-cover w-full aspect-square md:aspect-[4/3] max-h-[500px]" />
              <div className="absolute -bottom-8 -left-8 bg-white text-primary p-6 rounded-xl shadow-xl grid grid-cols-2 gap-8 hidden md:grid">
                <div>
                  <div className="text-4xl font-bold">20+</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">Años experiencia</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">1,500+</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">Proyectos completados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">98%</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">Clientes satisfechos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">100%</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">Garantía instalación</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Soluciones diseñadas para cada espacio</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Descubre nuestra amplia gama de productos en PVC, fabricados a la medida de tus necesidades.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-transparent shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary font-semibold text-sm flex items-center hover:underline">
                        Ver más →
                      </span>
                      <Button size="icon" variant="ghost" className="text-[#25D366] hover:text-[#25D366] hover:bg-green-50 rounded-full h-10 w-10" asChild>
                        <a href={`https://wa.me/50360707582?text=Hola INSTALUVI, deseo cotizar el producto: ${product.title} (ID: ${product.id})`} target="_blank" rel="noreferrer">
                          <SiWhatsapp size={22} />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="proyectos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Nuestra Galería</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Explora algunos de nuestros proyectos más recientes e inspírate.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map(category => (
              <Button 
                key={category}
                variant={activeGalleryTab === category ? "default" : "outline"}
                onClick={() => setActiveGalleryTab(category)}
                className="rounded-full px-6"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img src={item.imageUrl} alt={item.title || item.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg">{item.category}</p>
                    {item.title && <p className="text-white/80 text-sm mt-1">{item.title}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos Stats Overlay */}
      <section className="relative py-32 bg-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            onError={(e) => { e.currentTarget.src = refImage; }}
          />
        </div>
        <div className="container relative z-10 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Cada proyecto cuenta una historia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
              <HomeIcon size={48} className="mx-auto text-accent" />
              <div className="text-5xl font-bold">500+</div>
              <div className="text-lg text-white/80">Hogares transformados</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
              <Building size={48} className="mx-auto text-accent" />
              <div className="text-5xl font-bold">300+</div>
              <div className="text-lg text-white/80">Negocios y oficinas</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="space-y-4">
              <Award size={48} className="mx-auto text-accent" />
              <div className="text-5xl font-bold">100%</div>
              <div className="text-lg text-white/80">Compromiso con la calidad</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sucursales */}
      <section id="sucursales" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Nuestras Sucursales</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Visítanos en cualquiera de nuestras ubicaciones a nivel nacional para recibir asesoría personalizada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{branch.name}</h3>
                  <p className="text-muted-foreground mt-2">{branch.address}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="text-primary font-semibold">Tel:</span> {branch.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">{branch.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News / Novedades */}
      {news.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">Novedades</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Mantente al día con nuestras últimas noticias y lanzamientos.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full flex flex-col border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    {item.imageUrl && (
                      <div className="h-48 overflow-hidden bg-gray-100">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <CardContent className="p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </div>
  );
}
