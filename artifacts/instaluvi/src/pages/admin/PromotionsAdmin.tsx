import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Tag } from "lucide-react";
import { usePromotions, type Promotion } from "@/hooks/use-promotions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { useToast } from "@/hooks/use-toast";

const toDate = (ts: number) => ts ? new Date(ts).toISOString().split("T")[0] : "";
const fromDate = (s: string) => s ? new Date(s).getTime() : 0;

const EMPTY: Omit<Promotion, "id" | "createdAt"> = {
  title: "", description: "", imageUrl: "",
  startDate: Date.now(), endDate: Date.now() + 7 * 86400000, active: true,
};

function statusBadge(p: Promotion) {
  const now = Date.now();
  if (!p.active) return { label: "Inactiva", cls: "bg-gray-100 text-gray-500" };
  if (now < p.startDate) return { label: "Programada", cls: "bg-blue-50 text-blue-700" };
  if (now > p.endDate) return { label: "Vencida", cls: "bg-red-50 text-red-600" };
  return { label: "Activa", cls: "bg-green-50 text-green-700" };
}

export default function PromotionsAdmin() {
  const { promotions, loading, addPromotion, updatePromotion, deletePromotion } = usePromotions();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: Promotion } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: "add" }); };
  const openEdit = (p: Promotion) => {
    setForm({ title: p.title, description: p.description, imageUrl: p.imageUrl || "", startDate: p.startDate, endDate: p.endDate, active: p.active });
    setModal({ mode: "edit", item: p });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) { toast({ title: "Título y descripción son requeridos", variant: "destructive" }); return; }
    if (form.startDate >= form.endDate) { toast({ title: "La fecha de fin debe ser posterior a la de inicio", variant: "destructive" }); return; }
    setSaving(true);
    try {
      if (modal?.mode === "edit" && modal.item) { await updatePromotion(modal.item.id, form); toast({ title: "Promoción actualizada" }); }
      else { await addPromotion(form); toast({ title: "Promoción creada" }); }
      setModal(null);
    } catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try { await deletePromotion(deleteId); toast({ title: "Promoción eliminada" }); setDeleteId(null); }
    catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promociones</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestioná las ofertas y promociones del sitio</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Nueva promoción
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {promotions.length === 0 ? (
            <div className="py-16 flex flex-col items-center text-gray-400 gap-3">
              <Tag size={40} className="opacity-30" />
              <p className="text-sm">No hay promociones creadas</p>
              <button onClick={openAdd} className="text-accent text-sm font-medium hover:underline">Crear primera promoción</button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Promoción</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Vigencia</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden sm:table-cell">Estado</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {promotions.map(promo => {
                  const status = statusBadge(promo);
                  return (
                    <tr key={promo.id} className="hover:bg-gray-50/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {promo.imageUrl ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Tag size={20} className="text-primary" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{promo.title}</div>
                            <div className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{promo.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="text-xs text-gray-500">
                          <div>{new Date(promo.startDate).toLocaleDateString("es-SV")}</div>
                          <div className="text-gray-400">hasta {new Date(promo.endDate).toLocaleDateString("es-SV")}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.cls}`}>{status.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(promo)} className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil size={15} /></button>
                          <button onClick={() => setDeleteId(promo.id)} className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      <AdminModal open={!!modal} title={modal?.mode === "edit" ? "Editar promoción" : "Nueva promoción"} onClose={() => setModal(null)}>
        <div className="space-y-4">
          <ImageUpload value={form.imageUrl || ""} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} label="Imagen de la promoción (opcional)" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título <span className="text-red-500">*</span></label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: 20% de descuento en ventanas" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción <span className="text-red-500">*</span></label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describí la promoción..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha inicio <span className="text-red-500">*</span></label>
              <input type="date" value={toDate(form.startDate)} onChange={e => setForm(f => ({ ...f, startDate: fromDate(e.target.value) }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha fin <span className="text-red-500">*</span></label>
              <input type="date" value={toDate(form.endDate)} onChange={e => setForm(f => ({ ...f, endDate: fromDate(e.target.value) }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded accent-green-600" />
            <span className="text-sm text-gray-700">Activar promoción</span>
          </label>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModal(null)} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {modal?.mode === "edit" ? "Guardar cambios" : "Crear promoción"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} title="Eliminar promoción" message="Esta promoción se eliminará del sitio. ¿Continuar?" loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
