import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50360707582"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <SiWhatsapp size={28} />
    </a>
  );
}
