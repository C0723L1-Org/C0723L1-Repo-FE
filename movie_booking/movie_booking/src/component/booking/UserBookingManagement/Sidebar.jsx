import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaTicketAlt,
  FaBan,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import {Main} from "../../../layout/main/Main";

function Sidebar() {
  return (
      <Main content={
    <aside className="w-64 bg-white shadow-lg rounded-md hidden md:block">
      <div className="flex flex-col p-4 space-y-2">
        <NavLink
          to="/ho-so"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaUser className="mr-3 text-blue-500" />
          <span className="text-gray-800">Hồ sơ</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaCog className="mr-3 text-green-500" />
          <span className="text-gray-800">Đổi mật khẩu</span>
        </NavLink>
        <NavLink
          to="/lich-su-dat-ve"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaTicketAlt className="mr-3 text-red-500" />
          <span className="text-gray-800">Lịch sử đặt vé</span>
        </NavLink>
        <NavLink
          to="/canceled-tickets"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaBan className="mr-3 text-yellow-500" />
          <span className="text-gray-800">Vé đã hủy</span>
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaQuestionCircle className="mr-3 text-purple-500" />
          <span className="text-gray-800">Trợ giúp</span>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 font-semibold ${
              isActive
                ? "text-indigo-900 border  rounded-full"
                : "hover:text-indigo-900 hover:border hover:rounded-full"
            }`
          }
        >
          <FaSignOutAlt className="mr-3 text-gray-600" />
          <span className="text-gray-800">Đăng xuất</span>
        </NavLink>
      </div>
    </aside>
      }/>
  );
}

export default Sidebar;
