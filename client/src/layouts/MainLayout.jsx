import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingQuickActions from "../components/FloatingQuickActions";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingQuickActions />
      <Footer />
    </div>
  );
}
