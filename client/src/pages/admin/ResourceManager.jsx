import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorState from "../../components/ErrorState";
import ResourceForm from "./ResourceForm";
import { resources } from "../../config/adminResources";

export default function ResourceManager() {
  const { key } = useParams();
  const config = resources[key];
  const { data: items, loading, error, refetch } = useFetch(config?.endpoint, { deps: [key] });

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  if (!config) return <ErrorState message="Unknown resource." />;

  const openCreate = () => {
    setEditingItem(null);
    setFormOpen(true);
  };
  const openEdit = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingItem) await api.put(`${config.endpoint}/${editingItem._id}`, payload);
      else await api.post(config.endpoint, payload);
      setFormOpen(false);
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`${config.endpoint}/${id}`);
      refetch();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{config.label}</h1>
          <p className="text-navy-900/40 text-sm">Manage {config.label.toLowerCase()} shown across the public site.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-teal-500 text-ink-950 font-semibold text-sm px-5 py-3 rounded-full hover:bg-teal-400 transition"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {loading && <LoadingSpinner label={`Loading ${config.label.toLowerCase()}...`} />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {items && (
        <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-900/10 text-left text-navy-900/40 text-xs uppercase tracking-wide">
                {config.columns.map((col) => (
                  <th key={col} className="px-6 py-4 font-medium">{col}</th>
                ))}
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-navy-900/5 hover:bg-white/[0.02] transition">
                  {config.columns.map((col) => (
                    <td key={col} className="px-6 py-4 text-navy-900/70">
                      {String(item[col] ?? "—")}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="h-8 w-8 rounded-lg glass flex items-center justify-center text-navy-900/60 hover:text-teal-600">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="h-8 w-8 rounded-lg glass flex items-center justify-center text-navy-900/60 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="px-6 py-10 text-center text-navy-900/30">
                    No {config.label.toLowerCase()} yet. Click "Add New" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <ResourceForm
          config={config}
          item={editingItem}
          submitting={submitting}
          onCancel={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
