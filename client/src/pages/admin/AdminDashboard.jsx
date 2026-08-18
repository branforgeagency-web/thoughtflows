import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, MapPin, Users, Star, Image, TrendingUp, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { resources } from "../../config/adminResources";
import Overview from "./Overview";
import ResourceManager from "./ResourceManager";
import EnquiriesManager from "./EnquiriesManager";

const icons = {
  courses: BookOpen,
  branches: MapPin,
  trainers: Users,
  testimonials: Star,
  gallery: Image,
  "placement-stats": TrendingUp
};

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="hidden md:flex w-64 shrink-0 border-r border-navy-900/10 flex-col p-6 gap-1">
        <img src="/thoughtflows.png" alt="Thoughtflows" className="h-9 w-auto object-contain mb-8" />
        <NavItem to="/admin" end icon={LayoutDashboard} label="Overview" />
        {Object.entries(resources).map(([key, config]) => (
          <NavItem key={key} to={`/admin/resources/${key}`} icon={icons[key] || BookOpen} label={config.label} />
        ))}
        <NavItem to="/admin/enquiries" icon={MessageSquare} label="Enquiries" />

        <div className="mt-auto pt-6 border-t border-navy-900/10 flex flex-col gap-3">
          <p className="text-navy-900/40 text-xs">Signed in as</p>
          <p className="text-navy-900 text-sm font-medium truncate">{admin?.name}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-navy-900/50 hover:text-red-400 text-sm transition"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="resources/:key" element={<ResourceManager />} />
          <Route path="enquiries" element={<EnquiriesManager />} />
        </Routes>
      </main>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
          isActive ? "bg-teal-500/15 text-teal-600" : "text-navy-900/60 hover:bg-navy-900/5 hover:text-navy-900"
        }`
      }
    >
      <Icon size={17} /> {label}
    </NavLink>
  );
}
