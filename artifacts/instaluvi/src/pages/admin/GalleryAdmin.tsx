import { useState } from "react";
import { Plus, Trash2, Pencil, Loader2, Images } from "lucide-react";
import { useGallery, type GalleryItem } from "@/hooks/use-gallery";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["Ventanas", "Puertas", "Proyectos", "Instalaciones"];
const EMPTY: Omit<GalleryItem, "id" | "createdAt"> = { imageUrl: "", category: "Ventanas", title: "" };

export default function GalleryAdmin() {
  const { gallery, loading, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: GalleryItem } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [filter, setFilter] = useState("Todos");

  const openAdd = () => { setForm(EMPTY); setModal({ mode: "add" }); };
  const openEdit = (g: GalleryItem) => { setForm({ imageUrl: g.imageUrl, category: g.category, title: g.title || "" }); setModal({ mode: "edit", item: g }); };

  const filtered = filter === "Todos" ? gallery : gallery.filter(g => g.category === filter);

  const handleSave = async () => {
    if (!form.imageUrl) { toast({ title: "La imagen es requerida", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (modal?.mode === "edit" && modal.item) {
        await updateGalleryItem(modal.item.id, form);
        toast({ title: "Imagen actualizada" });
      } else {
        await addGalleryItem(form);
        toast({ title: "Imagen agregada a la galería" });
      }
      setModal(null);
    } catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try { await deleteGalleryItem(deleteId); toast({ title: "Imagen eliminada" }); setDeleteId(null); }
    catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galería</h1>
          <p className="text-sm text-gray-500 mt-0.5">Administrá las imágenes de proyectos y productos</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Subir imagen
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["Todos", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${filter === cat ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>{cat}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-3">
          <Images size={40} className="opacity-30" />
          <p className="text-sm">{filter === "Todos" ? "No hay imágenes en la galería" : `No hay imágenes en ${filter}`}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-square shadow-sm border border-gray-100">
              <img src={item.imageUrl} alt={item.title || item.category} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <span className="text-white text-xs font-semibold bg-white/20 px-2 py-1 rounded-full text-center leading-tight">
                  {item.title || item.category}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-1.5 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-[10px] font-semibold bg-primary/80 text-white px-2 py-0.5 rounded-full">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={!!modal} title={modal?.mode === "edit" ? "Editar imagen" : "Subir imagen"} onClose={() => setModal(null)} size="md">
        <div className="space-y-4">
          <ImageUpload value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} label="Imagen *" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título (opcional)</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: Proyecto residencial Escalón" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModal(null)} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {modal?.mode === "edit" ? "Guardar" : "Subir"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} title="Eliminar imagen" message="La imagen se eliminará de la galería. ¿Continuar?" loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
