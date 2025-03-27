import { NavLink } from "react-router-dom";
import { FaHome, FaSitemap, FaRegUser } from "react-icons/fa";
import { PiNotePencilDuotone } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import buildicon from '../assets/buildicon.svg';

const Sidebar = ({ expanded, toggleSidebar }) => {
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  return (
    <div
      className={`flex flex-col h-[100%] transition-all duration-300
        bg-[#031C30] text-[#edf2f7] ${expanded ? "w-[250px]" : "w-[80px]"}`}
    >
      {/* Sidebar Header */}
      {/* <div className="flex flex-col items-center pt-4">
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
      <div className="my-2 mt-8 border w-full border-gray-600"></div> */}
      <div className="h-[100px] bg-[#0388B4] "></div>

      {/* Navigation Links */}
      <div className="h-[100%] text-lg font-medium bg-[#0388B4]">
        <NavLink
          to="overview" end
          className={({ isActive }) =>
            `flex items-center justify-start mx-[20px] text-[25px] p-2 hover:bg-[#ffffff]  hover:text-[#0388B4] transition-colors my-[20px] rounded-[30px] h-[50px] min-h-fit ${isActive ? "bg-[#ffffff] text-[#0388B4]" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">All Buildings</span>}
        </NavLink>
        <NavLink
          to="detail/h1" end
          className={({ isActive }) =>
            `flex items-center justify-start mx-[20px] text-[25px] p-2 hover:bg-[#ffffff]  hover:text-[#0388B4] transition-colors my-[20px] rounded-[30px] h-[50px] ${isActive ? "bg-[#ffffff] text-[#0388B4]" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">BK.H1</span>}
        </NavLink>
        <NavLink
          to="detail/h2" end
          className={({ isActive }) =>
            `flex items-center justify-start mx-[20px] text-[25px] p-2 hover:bg-[#ffffff]  hover:text-[#0388B4] transition-colors my-[20px] rounded-[30px] h-[50px] ${isActive ? "bg-[#ffffff] text-[#0388B4]" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">BK.H2</span>}
        </NavLink>
        <NavLink
          to="detail/h3" end
          className={({ isActive }) =>
            `flex items-center justify-start mx-[20px] text-[25px] p-2 hover:bg-[#ffffff]  hover:text-[#0388B4] transition-colors my-[20px] rounded-[30px] h-[50px] ${isActive ? "bg-[#ffffff] text-[#0388B4]" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">BK.H3</span>}
        </NavLink>
        <NavLink
          to="detail/h6" end
          className={({ isActive }) =>
            `flex items-center justify-start mx-[20px] text-[25px] p-2 hover:bg-[#ffffff]  hover:text-[#0388B4] transition-colors my-[20px] rounded-[30px] h-[50px] ${isActive ? "bg-[#ffffff] text-[#0388B4]" : ""
            }`
          }
        >
          <FaHome />
          {expanded && <span className="ml-2">BK.H6</span>}
        </NavLink>


      </div>
    </div>
  );
};
export default Sidebar;