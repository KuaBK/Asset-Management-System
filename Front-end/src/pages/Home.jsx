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
      <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className="p-5 ml-[250px] flex-grow bg-gray-200">
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;
