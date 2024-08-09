import {MdLocalMovies} from "react-icons/md";
import React, {useState} from "react";
import {IoIosLogIn, IoMdSearch} from "react-icons/io";
import {FaCaretDown} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Menu = [{
    id: 1, name: "Trang Chủ", link: "/",
}, {
    id: 2, name: "Mua Vé", link: "/#",
}, {
    id: 3, name: "Hỗ Trợ", link: "/faq",
},];
const MovieDropdown = [{
    id: 1, name: "Phim Đang Chiếu", link: "/showing",
}, {
    id: 2, name: "Phim Sắp Chiếu", link: "/comming",
},];
const InformationDropdown = [{
    id: 1, name: "Thể Loại Phim", link: "/search-movie",
}, {
    id: 2, name: "Diễn Viên", link: "/actor",
}, {
    id: 3, name: "Đạo diễn", link: "/director",
}, {
    id: 4, name: "Hãng phim", link: "/studio",
},];
const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search-movie?query=${searchTerm}`);
        }
    };

    return (<div className="shadow-md bg-slate-100 dark:bg-gray-900 dark:text-white relative z-40">
            {/* Upper Navbar */}
            <div className="bg-slate-100 py-3 sm:py-0">
                <div className="container flex justify-between  items-center">
                    <div>
                        <a href="/" className="font-bold text-xl sm:text-3xl flex items-center ">
                            <MdLocalMovies className=" w-10 h-auto text-red-600 "/>
                            CINEMA
                        </a>
                    </div>
                    {/* Search Bar */}
                    <div>
                        <form className="group relative hidden sm:block" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-700 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
                            />
                            <button type="submit">
                                <IoMdSearch
                                    className="text-gray-500 group-hover:text-gray-900 absolute top-1/2 -translate-y-1/2 right-3"/>
                            </button>
                        </form>
                    </div>
                    {/* Button */}
                    <div className="flex justify-between items-center gap-3">
                        <button
                            onClick={() => alert("onclik")}
                            className=" from-primary to-secondary transition-all duration-200 justify-center  text-black py-1 px-4 rounded-full items-center gap-3 group"
                        >
                            <span className=" group-hover:text-blue-400  transition-all duration-300">
                                 Đăng nhập
                            </span>
                        </button>
                        <button
                            onClick={() => alert("onclik")}
                            className=" from-primary to-secondary transition-all duration-200 text-black py-1 px-4 rounded-full items-center gap-3 group"
                        >
                            <span className="group-hover:text-blue-400  transition-all duration-300">
                                Đăng ký
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Lower Navbar */}
            <div className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-5 ">
                    {Menu.map((data) => (<li key={data.id}>
                            <a href={data.link} className="inline-block px-4 hover:text-blue-400 duration-200">
                                {data.name}
                            </a>
                        </li>))}
                    {/* Li movie */}
                    <li className="group relative cursor-pointer">
                        <a href="#" className="flex items-center gap-[2px] py-2 hover:text-blue-400">
                            Phim
                            <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180"/>
              </span>
                        </a>
                        <div
                            className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-slate-200 p-2 text-black">
                            <ul>
                                {MovieDropdown.map((data) => (<li key={data.id}>
                                        <a href={data.link}
                                           className="inline-block w-full rounded-md p-2 hover:text-blue-400">
                                            {data.name}
                                        </a>
                                    </li>))}
                            </ul>
                        </div>
                    </li>
                    {/* Li information movie */}
                    <li className="group relative cursor-pointer">
                        <a href="#" className="flex items-center gap-[2px] py-2 hover:text-blue-400">
                            Góc Điện Ảnh
                            <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180"/>
              </span>
                        </a>
                        <div
                            className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-slate-200 p-2 text-black shadow-md">
                            <ul>
                                {InformationDropdown.map((data) => (<li key={data.id}>
                                        <a href={data.link}
                                           className="inline-block w-full rounded-md p-2 hover:text-blue-400">
                                            {data.name}
                                        </a>
                                    </li>))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>);
};

export default Navbar;
