import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;
