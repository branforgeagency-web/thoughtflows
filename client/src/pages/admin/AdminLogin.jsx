import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import MagneticButton from "../../components/MagneticButton";

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(form.email, form.password);
    if (res.success) navigate("/admin");
    else setError(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient px-6">
      <div className="absolute inset-0 bg-grid-glow pointer-events-none" />
      <form onSubmit={handleSubmit} className="relative z-10 glass-strong rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5">
        <img src="/logo.png" alt="Thoughtflows" className="h-10 w-auto object-contain mx-auto mb-2" />
        <h1 className="text-xl font-semibold text-navy-900 text-center">Admin Sign In</h1>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-navy-900/50">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="glass rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-teal-400/40"
            placeholder="admin@thoughtflows.in"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-navy-900/50">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="glass rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-teal-400/40"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <MagneticButton type="submit" disabled={loading} className="w-full justify-center mt-2">
          {loading ? "Signing in..." : "Sign In"} <LogIn size={16} />
        </MagneticButton>
      </form>
    </div>
  );
}
