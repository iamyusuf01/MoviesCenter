import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Footer from "../../components/admin/Footer";
import Navbar from "../../components/admin/Navbar";

const Admin = () => {
  return (
    <div className="text-[15px] min-h-screen bg-white">
      <Navbar/>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
