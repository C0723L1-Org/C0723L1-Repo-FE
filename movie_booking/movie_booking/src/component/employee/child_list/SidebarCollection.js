import { Link } from "react-router-dom";
import { useState } from 'react';
import { TicketIcon, EmployeeIcon, UserIcon, MovieIcon, PromotionIcon, RoomIcon, StatisticalIcon, LoginIcon, RegisterIcon } from "../utils/Icons";
import "../../../css/employee/styles.css";
export const SidebarCollection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full h-full">
            {/* Nút Hamburger */}
            <button
                className="xl:hidden p-1 focus:outline-none bg-white text-gray-800 rounded-xl hover:bg-gray-200"
                onClick={toggleSidebar}
            >
                {/* Icon Hamburger */}
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Sidebar */}
            <div className={`fixed xl:static z-50 bg-white shadow-sm border border-blue-gray-100 rounded-xl p-4 ${isOpen ? 'block' : 'hidden'} xl:block ${isOpen ? 'xl:hidden' : ''}`}>
                <div className="min-h-full">
                    <Link to="/"><h1 className="text-2xl my-3 mx-6 font-bold text-black text-center">Trang quản lý</h1></Link>
                    <ul className="mb-4 flex flex-col gap-1">
                        <li className="tw-sidebar-item">
                            <Link className="tw-sidebar-link" to="/ticket">
                                <TicketIcon />
                                <p className="tw-sidebar-text">Quản lý đặt vé</p>
                            </Link>
                        </li>
                        <li className="tw-sidebar-item xl:w-full">
                            <Link className="tw-sidebar-link" to="/employee">
                                <EmployeeIcon />
                                <p className="tw-sidebar-text">Quản lý nhân viên</p>
                            </Link>
                        </li>
                        <li className="tw-sidebar-item">
                            <a className="tw-sidebar-link" href="#">
                                <UserIcon />
                                <p className="tw-sidebar-text">Quản lý thành viên</p>
                            </a>
                        </li>
                        <li className="tw-sidebar-item">
                            <Link className="tw-sidebar-link" to="/movie-manager">
                                <MovieIcon />
                                <p className="tw-sidebar-text">Quản lý phim</p>
                            </Link>
                        </li>
                        <li className="tw-sidebar-item">
                            <a className="tw-sidebar-link" href="#">
                                <PromotionIcon />
                                <p className="tw-sidebar-text">Khuyến mãi</p>
                            </a>
                        </li>
                        <li className="tw-sidebar-item">
                            <a className="tw-sidebar-link" href="#">
                                <RoomIcon />
                                <p className="tw-sidebar-text">Quản lý phòng chiếu</p>
                            </a>
                        </li>
                        <li className="tw-sidebar-item">
                            <a className="tw-sidebar-link" href="#">
                                <StatisticalIcon />
                                <p className="tw-sidebar-text">Thống kê</p>
                            </a>
                        </li>
                        {/* Các mục khác tương tự */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
