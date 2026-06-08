import { useState } from "react";
import { Plus, Pencil, Trash2, MapPin, Loader2 } from "lucide-react";
import { useBranches, type Branch } from "@/hooks/use-branches";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AdminModal } from "@/components/admin/AdminModal";
import { useToast } from "@/hooks/use-toast";

const EMPTY: Omit<Branch, "id" | "createdAt"> = {
  name: "", address: "", phone: "", hours: "", mapUrl: "", imageUrl: "",
};

export default function BranchesAdmin() {
  const { branches, loading, addBranch, updateBranch, deleteBranch } = useBranches();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: Branch } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: "add" }); };
  const openEdit = (b: Branch) => {
    setForm({ name: b.name, address: b.address, phone: b.phone, hours: b.hours, mapUrl: b.mapUrl, imageUrl: b.imageUrl || "" });
    setModal({ mode: "edit", item: b });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast({ title: "Nombre y dirección son requeridos", variant: "destructive" }); return;
    }
    setSaving(true);
    try {
      if (modal?.mode === "edit" && modal.item) {
        await updateBranch(modal.item.id, form);
        toast({ title: "Sucursal actualizada" });
      } else {
        await addBranch(form);
        toast({ title: "Sucursal creada" });
      }
      setModal(null);
    } catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try { await deleteBranch(deleteId); toast({ title: "Sucursal eliminada" }); setDeleteId(null); }
    catch (e: unknown) { toast({ title: "Error", description: (e as Error).message, variant: "destructive" }); }
    finally { setDeleting(false); }
  };

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sucursales</h1>
          <p className="text-sm text-gray-500 mt-0.5">Administrá las ubicaciones de INSTALUVI</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Nueva sucursal
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.map(branch => (
            <div key={branch.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              {branch.imageUrl && (
                <div className="h-32 rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <img src={branch.imageUrl} alt={branch.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{branch.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{branch.address}</p>
                  </div>
                </div>
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button onClick={() => openEdit(branch)} className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(branch.id)} className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                {branch.phone && <p>📞 {branch.phone}</p>}
                {branch.hours && <p>🕐 {branch.hours}</p>}
                {branch.mapUrl && <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline block">📍 Ver en Google Maps</a>}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && branches.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">No hay sucursales registradas.</div>}

      <AdminModal open={!!modal} title={modal?.mode === "edit" ? "Editar sucursal" : "Nueva sucursal"} onClose={() => setModal(null)}>
        <div className="space-y-4">
          <ImageUpload value={form.imageUrl || ""} onChange={url => setForm(prev => ({ ...prev, imageUrl: url }))} label="Foto de la sucursal" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre <span className="text-red-500">*</span></label>
              <input type="text" value={form.name} onChange={f("name")} placeholder="Ej: San Salvador - Escalón" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección <span className="text-red-500">*</span></label>
              <input type="text" value={form.address} onChange={f("address")} placeholder="Ej: Calle Principal #123, Colonia Escalón" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
              <input type="text" value={form.phone} onChange={f("phone")} placeholder="+503 6070-7582" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Horario</label>
              <input type="text" value={form.hours} onChange={f("hours")} placeholder="Lun–Vie: 8am–5pm" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link de Google Maps</label>
              <input type="url" value={form.mapUrl} onChange={f("mapUrl")} placeholder="https://maps.google.com/..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModal(null)} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {modal?.mode === "edit" ? "Guardar cambios" : "Crear sucursal"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} title="Eliminar sucursal" message="Se eliminará esta sucursal del sitio web. ¿Continuar?" loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
