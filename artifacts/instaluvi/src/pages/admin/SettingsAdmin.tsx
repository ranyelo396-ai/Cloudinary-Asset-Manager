import { useState, useEffect } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { useSettings, type Settings } from "@/hooks/use-settings";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/hooks/use-toast";

export default function SettingsAdmin() {
  const { settings, loading, saveSettings } = useSettings();
  const { toast } = useToast();
  const [form, setForm] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(settings); }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings(form);
      toast({ title: "Configuración guardada" });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      toast({ title: "Error al guardar", description: (e as Error).message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const f = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  if (loading) return <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ajustes del Sitio</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configurá la información de contacto y redes sociales</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Contact info */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Información de Contacto</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Número de WhatsApp</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">+</span>
                <input type="text" value={form.whatsapp} onChange={f("whatsapp")} placeholder="50360707582" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Sin espacios ni guiones. Ej: 50360707582</p>
            </div>
          </div>
        </div>

        {/* Social media */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Redes Sociales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL de Facebook</label>
              <input type="url" value={form.facebook} onChange={f("facebook")} placeholder="https://www.facebook.com/instaluvi" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL de Instagram</label>
              <input type="url" value={form.instagram} onChange={f("instagram")} placeholder="https://www.instagram.com/instaluvi_elsalvador" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Contenido del Hero</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título principal del Hero</label>
              <input type="text" value={form.heroTitle || ""} onChange={f("heroTitle")} placeholder="Ventanas y puertas que transforman tu hogar." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtítulo del Hero</label>
              <input type="text" value={form.heroSubtitle || ""} onChange={f("heroSubtitle")} placeholder="Diseño, calidad y durabilidad..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <ImageUpload
              value={form.heroImageUrl || ""}
              onChange={url => setForm(prev => ({ ...prev, heroImageUrl: url }))}
              label="Imagen del Hero (lado derecho)"
            />
          </div>
        </div>

        {/* Logo */}
        <div className="p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Logo del Sitio</h2>
          <ImageUpload
            value={form.logoUrl || ""}
            onChange={url => setForm(prev => ({ ...prev, logoUrl: url }))}
            label="Logo principal"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle2 size={16} /> Guardado
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Guardar configuración
        </button>
      </div>
    </div>
  );
}
