import React from "react";
import Navbar from "../Components/Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import ScrollToTop from "../Components/Common/ScrollToTop";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-100">
      <ScrollToTop />
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
