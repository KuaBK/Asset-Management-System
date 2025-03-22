import { NavLink } from "react-router-dom";
import { FaHome, FaSitemap, FaRegUser } from "react-icons/fa";
import { PiNotePencilDuotone } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";

const Sidebar = ({ expanded, toggleSidebar }) => {
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  return (
    <div
      className={`fixed top-0 left-0 flex flex-col h-screen transition-all duration-300
        bg-[#031C30] text-[#edf2f7] ${expanded ? "w-[250px]" : "w-[80px]"}`}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col items-center pt-4">
        <div className="relative flex items-center justify-center w-full">
          <span
            className={`flex-1 text-center font-bold text-lg transition-opacity duration-300 
              ${!expanded || isLogoHidden ? "opacity-0" : "opacity-100"}`}
          >
            BK-MANARATE
          </span>
          <button
            onClick={toggleSidebar}
            className="absolute right-2 text-xl cursor-pointer bg-none border-none"
            aria-label="Toggle Sidebar"
          >
            {expanded ? "<" : ">"}
          </button>
        </div>
      </div>
      <div className="my-2 mt-8 border w-full border-gray-600"></div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-grow text-lg font-medium">
        <NavLink
          to="/building" end
          className={({ isActive }) =>
            `flex flex-1 items-center p-2 hover:bg-gray-600 transition-colors ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">Tòa nhà 1</span>}
        </NavLink>

        <NavLink
          to="/building" end
          className={({ isActive }) =>
            `flex flex-1 items-center p-2 hover:bg-gray-600 transition-colors ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">Tòa nhà 2</span>}
        </NavLink>

        <NavLink
          to="/building" end
          className={({ isActive }) =>
            `flex flex-1 items-center p-2 hover:bg-gray-600 transition-colors ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">Tòa nhà 3</span>}
        </NavLink>

        <NavLink
          to="/building" end
          className={({ isActive }) =>
            `flex flex-1 items-center p-2 hover:bg-gray-600 transition-colors ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">Tòa nhà 4</span>}
        </NavLink>

      </div>
    </div>
  );
};
export default Sidebar;
