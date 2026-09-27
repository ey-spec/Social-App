import React from "react";
import Navbar from "../Components/Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Common/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto min-h-screen py-12 px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
