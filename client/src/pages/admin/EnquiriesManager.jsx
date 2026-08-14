import { useState } from "react";
import { Trash2, Phone, Mail } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorState from "../../components/ErrorState";

const statusColors = {
  new: "bg-teal-500/20 text-teal-600",
  contacted: "bg-amber-500/15 text-amber-700",
  enrolled: "bg-green-500/15 text-green-700",
  closed: "bg-navy-900/10 text-navy-900/40"
};

export default function EnquiriesManager() {
  const { data: enquiries, loading, error, refetch } = useFetch("/enquiries");
  const [updatingId, setUpdatingId] = useState(null);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/enquiries/${id}`, { status });
      refetch();
    } finally {
      setUpdatingId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    await api.delete(`/enquiries/${id}`);
    refetch();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Enquiries</h1>
        <p className="text-navy-900/40 text-sm">Leads submitted through the public contact form.</p>
      </div>

      {loading && <LoadingSpinner label="Loading enquiries..." />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {enquiries && (
        <div className="flex flex-col gap-4">
          {enquiries.map((e) => (
            <div key={e._id} className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-navy-900 font-semibold">{e.name}</p>
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${statusColors[e.status] || statusColors.new}`}>
                    {e.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-navy-900/50 mt-2">
                  <span className="flex items-center gap-1.5"><Phone size={12} /> {e.phone}</span>
                  <span className="flex items-center gap-1.5"><Mail size={12} /> {e.email}</span>
                  {e.branch?.city && <span>Branch: {e.branch.city}</span>}
                  {e.course?.name && <span>Course: {e.course.name}</span>}
                </div>
                {e.message && <p className="text-navy-900/40 text-xs mt-2 max-w-xl">{e.message}</p>}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={e.status}
                  disabled={updatingId === e._id}
                  onChange={(ev) => updateStatus(e._id, ev.target.value)}
                  className="glass rounded-lg px-3 py-2 text-xs text-navy-900 bg-transparent outline-none"
                >
                  {["new", "contacted", "enrolled", "closed"].map((s) => (
                    <option key={s} value={s} className="bg-white">{s}</option>
                  ))}
                </select>
                <button onClick={() => remove(e._id)} className="h-9 w-9 rounded-lg glass flex items-center justify-center text-navy-900/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {enquiries.length === 0 && <p className="text-navy-900/30 text-center py-16">No enquiries yet.</p>}
        </div>
      )}
    </div>
  );
}
