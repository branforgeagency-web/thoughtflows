import { Link } from "react-router-dom";
import { resources } from "../../config/adminResources";
import useFetch from "../../hooks/useFetch";

function CountCard({ resKey, config }) {
  const { data } = useFetch(config.endpoint);
  return (
    <Link to={`/admin/resources/${resKey}`} className="glass rounded-2xl p-6 flex flex-col gap-2 hover:border-teal-400/30 hover:-translate-y-1 transition-all duration-300">
      <span className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500">
        {data ? data.length : "—"}
      </span>
      <span className="text-navy-900/50 text-sm">{config.label}</span>
    </Link>
  );
}

export default function Overview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
        <p className="text-navy-900/40 text-sm">Manage every piece of content shown on the public Thoughtflows website.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(resources).map(([key, config]) => (
          <CountCard key={key} resKey={key} config={config} />
        ))}
        <Link to="/admin/enquiries" className="glass rounded-2xl p-6 flex flex-col gap-2 hover:border-teal-400/30 hover:-translate-y-1 transition-all duration-300 bg-teal-500/5">
          <span className="text-navy-900 font-semibold">Enquiries</span>
          <span className="text-navy-900/50 text-sm">Review and follow up on leads</span>
        </Link>
      </div>
    </div>
  );
}
