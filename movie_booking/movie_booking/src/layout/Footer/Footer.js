import {FaFacebookF, FaTwitter, FaGithub, FaLinkedin, FaInstagram} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {MdLocalMovies} from "react-icons/md";
import React from "react";
import {TfiYoutube} from "react-icons/tfi";
const FooterLink = [
    {
        title:"Về Chúng Tôi",
        link:"/#"
    },
    {
        title:"Thỏa Thuận Sử Dụng",
        link:"/#"
    },
    {
        title:"Quy Chế Hoạt Động",
        link:"/#"
    },
    {
        title:"Chính Sách Bảo Mật",
        link:"/#"
    }
]
const FooterLink1 = [
    {
        title:"Góp Ý",
        link:"/support"
    },
    {
        title:"Sale & Service",
        link:"/#"
    },
    {
        title:"Giá Vé",
        link:"/booking"
    },
    {
        title:"Tuyển Dụng",
        link:"/#"
    },
    {
        title:"FAQ",
        link:"/faq"
    }
]
const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="text-white bg-neutral-800 h-full">
            <div className="container">
                <div className="grid md:grid-cols-3 pv-44 pt-5">
                    {/*Company Detail*/}
                    <div className="py-5 px-4">
                        <a href="/movie_booking/movie_booking/public" className="font-bold text-xl sm:text-3xl flex text-justify mb-3 items-center ">
                            <MdLocalMovies className=" w-10 h-auto text-red-600 "/>
                            CINEMA
                        </a>
                    </div>
                    {/*Footer Link*/}
                    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                        <div className="py-5 px-4">
                            <div className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                                GIỚI THIỆU
                            </div>
                            <ul className="flex flex-col gap-3">
                                {
                                    FooterLink.map((link, index) => (
                                        <li className="cursor-pointer hover:text-blue-400 hover:translate-x-1 duration-300"
                                            key={link.title}>
                                            <span >{link.title}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="py-5 px-4">
                            <div className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                                HỔ TRỢ
                            </div>
                            <ul className="flex flex-col gap-3">
                                {
                                    FooterLink1.map((link, index) => (
                                        <li className="cursor-pointer hover:text-blue-400 hover:translate-x-1 duration-300"
                                            key={link.title}
                                            onClick={() => {
                                                navigate(`${link.link}`);
                                            }}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/*Social Link*/}
                        <div className="py-5 px-12">
                            <div className="flex gap-4">
                                <a href="#" className="">
                                    <FaFacebookF className="text-3xl hover:text-blue-400"/>
                                </a>
                                <a href="#" className="">
                                    <TfiYoutube className="text-3xl hover:text-red-500"/>
                                </a>
                                <a href="#" className="">
                                    <FaInstagram  className="text-3xl hover:text-pink-400"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
