import { NavLink } from "react-router-dom";
import { FaHome, FaBuilding, FaCalculator, FaTools } from "react-icons/fa";

const Sidebar = ({ expanded }) => {
  return (
    <div
      className={`flex flex-col h-[100%] transition-all duration-300 bg-[#0388B4] text-[#edf2f7] 
        ${expanded ? "w-[250px]" : "w-[80px]"} shadow-lg`}
    >
      <div className="flex-1 mt-6 space-y-3 px-3">
        <SidebarLink to="overview" icon={<FaHome />} label="All Buildings" expanded={expanded} />
        <SidebarLink to="detail/h1" icon={<FaBuilding />} label="BK.H1" expanded={expanded} />
        <SidebarLink to="detail/h2" icon={<FaBuilding />} label="BK.H2" expanded={expanded} />
        <SidebarLink to="detail/h3" icon={<FaBuilding />} label="BK.H3" expanded={expanded} />
        <SidebarLink to="detail/h6" icon={<FaBuilding />} label="BK.H6" expanded={expanded} />
        <SidebarLink to="detail/calculation" icon={<FaCalculator />} label="Depreciation" expanded={expanded} />
        <SidebarLink to="history" icon={<FaTools />} label="Repair Log" expanded={expanded} />
      </div>

      <div className="h-[50px]"></div>
    </div>
  );
};

// Component Sidebar Link
const SidebarLink = ({ to, icon, label, expanded }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center mx-[15px] text-lg font-medium p-3 rounded-lg transition-all duration-300 
         ${isActive ? "bg-[#ffffff] text-[#0388B4]" : "text-white hover:bg-[#ffffff] hover:text-[#0388B4]"}`
      }
    >
      {icon}
      {expanded && <span className="ml-3">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
