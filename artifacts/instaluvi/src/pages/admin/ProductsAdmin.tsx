import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Loader2 } from "lucide-react";
import { useProducts, type Product } from "@/hooks/use-products";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["Ventanas", "Puertas", "Otros"];

const EMPTY: Omit<Product, "id" | "createdAt"> = {
  title: "", description: "", category: "Ventanas",
  imageUrl: "", gallery: [], featured: false, active: true,
};

export default function ProductsAdmin() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: Product } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: "add" }); };
  const openEdit = (p: Product) => { setForm({ title: p.title, description: p.description, category: p.category, imageUrl: p.imageUrl, gallery: p.gallery, featured: p.featured, active: p.active }); setModal({ mode: "edit", item: p }); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Campos requeridos", description: "Título y descripción son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (modal?.mode === "edit" && modal.item) {
        await updateProduct(modal.item.id, form);
        toast({ title: "Producto actualizado" });
      } else {
        await addProduct(form);
        toast({ title: "Producto creado" });
      }
      setModal(null);
    } catch (e: unknown) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteId);
      toast({ title: "Producto eliminado" });
      setDeleteId(null);
    } catch (e: unknown) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
    } finally { setDeleting(false); }
  };

  const toggle = async (p: Product, field: "active" | "featured") => {
    try {
      await updateProduct(p.id, { [field]: !p[field] });
      toast({ title: field === "active" ? (p.active ? "Desactivado" : "Activado") : (p.featured ? "Quitado de destacados" : "Marcado como destacado") });
    } catch { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-sm text-gray-500 mt-0.5">Administrá el catálogo de productos PVC</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Producto</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Estado</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm leading-tight">{p.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${p.active ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={`text-xs font-medium ${p.active ? "text-green-700" : "text-gray-400"}`}>{p.active ? "Activo" : "Inactivo"}</span>
                      {p.featured && <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-medium rounded-full">Destacado</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggle(p, "featured")} title={p.featured ? "Quitar destacado" : "Destacar"} className={`p-1.5 rounded-md transition-colors ${p.featured ? "text-amber-500 bg-amber-50 hover:bg-amber-100" : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"}`}><Star size={15} /></button>
                      <button onClick={() => toggle(p, "active")} title={p.active ? "Desactivar" : "Activar"} className={`p-1.5 rounded-md transition-colors ${p.active ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-gray-400 hover:text-green-600 hover:bg-green-50"}`}>{p.active ? <Eye size={15} /> : <EyeOff size={15} />}</button>
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">No hay productos. Agregá uno nuevo.</div>}
        </div>
      )}

      <AdminModal open={!!modal} title={modal?.mode === "edit" ? "Editar producto" : "Nuevo producto"} onClose={() => setModal(null)}>
        <div className="space-y-5">
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Imagen del producto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: Ventanas Corredizas Premium" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción <span className="text-red-500">*</span></label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descripción del producto..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-3 justify-center pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm text-gray-700">Producto destacado</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded accent-green-600" />
                <span className="text-sm text-gray-700">Producto activo (visible en la web)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModal(null)} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {modal?.mode === "edit" ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} title="Eliminar producto" message="Esta acción no se puede deshacer. ¿Estás seguro?" loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
