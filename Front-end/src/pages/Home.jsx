import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BuildingDetail from "./BuildingDetail";
import Header from "../components/Header";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="h-screen max-h-screen max-w-full flex flex-col">
      <Header />
      {/* Sidebar */}
      <div className="flex flex-1 h-[85vh]">
        <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        <div className="h-[100%] overflow-auto p-5 flex-grow bg-gray-100">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Home;
