import React, { useState } from "react";
import {FaPlus, FaShareAlt, FaFacebookF, FaInstagram, FaGithub} from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import {useNavigate} from "react-router-dom";

const SpeedDial = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="fixed end-6 bottom-6 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`flex flex-col items-center ${isOpen ? "flex" : "hidden"} mb-4 space-y-2`}>
                <button
                    type="button"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <FaShareAlt/>
                    <span className="sr-only">Share</span>
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <FaFacebookF className="text-3xl hover:text-blue-400"/>
                    <span className="sr-only">FB</span>
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <TfiYoutube className="text-3xl hover:text-red-500"/>
                    <span className="sr-only">YT</span>
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <FaGithub className="text-3xl hover:text-black-500"/>
                    <span className="sr-only">YT</span>
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <FaInstagram className="text-3xl hover:text-pink-400"/>
                    <span className="sr-only">IG</span>
                </button>
            </div>
            <button
                type="button"
                className="flex items-center justify-center text-white bg-orange-400 rounded-full w-14 h-14 hover:bg-orange-300 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <FaPlus className={`w-5 h-5 transition-transform duration-400 ${isOpen ? "rotate-90" : ""}`}/>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
};

export default SpeedDial;
