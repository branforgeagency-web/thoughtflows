import { Link } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-6">
      <p className="text-teal-600 font-display text-7xl font-bold">404</p>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">This page took a wrong turn.</h1>
      <p className="text-slate-600 max-w-md font-medium">The page you're looking for doesn't exist or may have moved.</p>
      <MagneticButton as={Link} to="/">Back to Home</MagneticButton>
    </section>
  );
}
