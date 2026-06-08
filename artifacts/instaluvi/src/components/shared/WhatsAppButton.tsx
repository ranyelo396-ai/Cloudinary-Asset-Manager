import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50360707582"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-20 md:bottom-8 right-5 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] text-white pr-4 pl-3 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group"
    >
      <SiWhatsapp size={22} />
      <span className="hidden md:block text-sm font-semibold whitespace-nowrap">Escríbenos</span>
    </a>
  );
}
