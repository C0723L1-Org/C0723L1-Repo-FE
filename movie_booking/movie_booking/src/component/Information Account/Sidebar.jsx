import React, { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCog,
  faTicketAlt,
  faBan,
  faQuestionCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

function Sidebar() {
    const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <>
        <button
            className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <aside
            className={`${
                isOpen ? "block" : "hidden"
            } md:block w-64 bg-white shadow-lg rounded-md`}
        >
          <div className="flex flex-col p-4 space-y-2">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-500" />
              <span className="text-gray-800">Hồ sơ</span>
            </NavLink>

            <NavLink
                to="/change-password"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon icon={faCog} className="mr-3 text-green-500" />
              <span className="text-gray-800">Đổi mật khẩu</span>
            </NavLink>

            <NavLink
                to="/use-booking-management"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon icon={faTicketAlt} className="mr-3 text-red-500" />
              <span className="text-gray-800">Lịch sử đặt vé</span>
            </NavLink>

            <NavLink
                to="/canceled-tickets"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon icon={faBan} className="mr-3 text-yellow-500" />
              <span className="text-gray-800">Vé đã hủy</span>
            </NavLink>

            <NavLink
                to="/faq"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="mr-3 text-purple-500"
              />
              <span className="text-gray-800">Trợ giúp</span>
            </NavLink>

            <NavLink
                to="/"
                onClick={() => {
                    localStorage.clear();
                    Cookies.set('jwt', '')
                }}
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 font-semibold ${
                        isActive
                            ? "text-indigo-900 border rounded-full"
                            : "hover:text-indigo-900 hover:border hover:rounded-full"
                    }`
                }
            >
              <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="mr-3 text-gray-600"
              />
              <span className="text-gray-800">Đăng xuất</span>
            </NavLink>
          </div>
        </aside>
      </>
  );
}

export default Sidebar;
