import { X } from "lucide-react";
import { ReactNode } from "react";

interface AdminModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

export function AdminModal({ open, title, onClose, children, size = "lg" }: AdminModalProps) {
  if (!open) return null;
  const widths = { md: "max-w-md", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-white rounded-xl shadow-2xl w-full ${widths[size]} my-4`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
