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
    <div className="h-screen flex flex-col">
      <Header />
      {/* Sidebar */}
      <div className="flex flex-1">
        <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        <div className="p-5 flex-grow bg-white">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Home;
