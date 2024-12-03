import { memo } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar Content */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header>
          <Navbar />
        </header>
        <main className="pt-8 px-6 pb-8 overflow-y-auto">
          {/* Render route component */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default memo(Layout);
