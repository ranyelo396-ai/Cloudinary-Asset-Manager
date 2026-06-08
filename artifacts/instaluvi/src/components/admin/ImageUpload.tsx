import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = "Imagen", className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Solo se permiten imágenes"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Máximo 10 MB"); return; }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="relative group w-full h-40 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-600"
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
            uploading
              ? "border-accent/50 bg-accent/5 cursor-wait"
              : "border-gray-300 bg-gray-50 hover:border-accent hover:bg-accent/5"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-accent animate-spin" />
              <span className="text-sm text-gray-500">Subiendo a Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload size={28} className="text-gray-400" />
              <span className="text-sm text-gray-500 text-center px-4">
                Arrastrá una imagen aquí o<br />
                <span className="text-accent font-medium">hacé click para seleccionar</span>
              </span>
              <span className="text-xs text-gray-400">PNG, JPG, WebP · Máx. 10 MB</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}
