import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BuildingDetail from "./BuildingDetail";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={isSidebarExpanded ? "w-64" : "w-16"}>
        <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 ml-4 p-4">
        <BuildingDetail />
      </div>
    </div>
  );
};

export default Home;
