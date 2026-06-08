import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { useNews, type NewsItem } from "@/hooks/use-news";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { useToast } from "@/hooks/use-toast";

const EMPTY: Omit<NewsItem, "id" | "createdAt"> = { title: "", description: "", imageUrl: "", active: true };

export default function NewsAdmin() {
  const { news, loading, addNews, updateNews, deleteNews } = useNews();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: NewsItem } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: "add" }); };
  const openEdit = (n: NewsItem) => { setForm({ title: n.title, description: n.description, imageUrl: n.imageUrl || "", active: n.active }); setModal({ mode: "edit", item: n }); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) { toast({ title: "Título y descripción son requeridos", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (modal?.mode === "edit" && modal.item) { await updateNews(modal.item.id, form); toast({ title: "Novedad actualizada" }); }
      else { await addNews(form); toast({ title: "Novedad publicada" }); }
      setModal(null);
    } catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try { await deleteNews(deleteId); toast({ title: "Novedad eliminada" }); setDeleteId(null); }
    catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setDeleting(false); }
  };

  const toggleActive = async (item: NewsItem) => {
    try { await updateNews(item.id, { active: !item.active }); toast({ title: item.active ? "Desactivada" : "Activada" }); }
    catch { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novedades</h1>
          <p className="text-sm text-gray-500 mt-0.5">Publicá noticias y actualizaciones de INSTALUVI</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Nueva novedad
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {news.map(item => (
            <div key={item.id} className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${item.active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              {item.imageUrl && (
                <div className="h-40 bg-gray-100 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight flex-1">{item.title}</h3>
                  <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${item.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.active ? "Activa" : "Inactiva"}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => toggleActive(item)} className="p-1.5 rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">{item.active ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && news.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">No hay novedades publicadas.</div>}

      <AdminModal open={!!modal} title={modal?.mode === "edit" ? "Editar novedad" : "Nueva novedad"} onClose={() => setModal(null)}>
        <div className="space-y-4">
          <ImageUpload value={form.imageUrl || ""} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} label="Imagen (opcional)" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título <span className="text-red-500">*</span></label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: Nueva línea de ventanas europeas" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción <span className="text-red-500">*</span></label>
            <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describí la novedad..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded accent-green-600" />
            <span className="text-sm text-gray-700">Publicar en el sitio web</span>
          </label>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModal(null)} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {modal?.mode === "edit" ? "Guardar cambios" : "Publicar"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} title="Eliminar novedad" message="Esta novedad se eliminará del sitio. ¿Continuar?" loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
