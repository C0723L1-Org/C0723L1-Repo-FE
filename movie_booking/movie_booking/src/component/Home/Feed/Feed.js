import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Home1 from "../../../assets/home1.jpg";
import Home2 from "../../../assets/home2.jpg";
import Home3 from "../../../assets/home3.jpg";
import { Link } from "react-router-dom";

const Feed = () => {
    const slides = [
        {
            title: "Marvel Universe",
            firstName: "Venom: Let there",
            lastName: "Be Carnage",
            url: Home1,
        },
        {
            title: "Marvel Universe",
            firstName: "Avenger:",
            lastName: " Infinity War",
            url: Home2,
        },
        {
            title: "Marvel Universe",
            firstName: "Spider-Man:",
            lastName: " Far From Home",
            url: Home3,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    return (
        <div className="dark h-full w-full flex items-center justify-center" data-aos="fade-out">
            <div className="h-full w-full m-auto py-4 px-4 relative group">
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl bg-center bg-cover duration-500"
                ></div>
                <div className="absolute top-[50%] z-1000 text-left p-4 md:px-[100px] lg:px-[150px]">
                    <span className="text-white font-medium uppercase">
                        {slides[currentIndex].title}
                    </span>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {slides[currentIndex].firstName}
                        <br />
                        {slides[currentIndex].lastName}
                    </h1>
                    <Link
                        to={`/`}
                        type="button"
                        className="
                        font-normal whitespace-nowrap border cursor-pointer text-sm capitalize transition-colors duration-200 transform
                        px-5 py-2.5 rounded-lg mt-4 text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440]
                        inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                    >
                        <img
                            alt="Logo Buy Ticket"
                            width="400"
                            height="250"
                            className="mr-2"
                            src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                            style={{ color: "transparent" }}
                        />
                        Mua vé
                    </Link>
                </div>
                <div
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                    onClick={prevSlide}
                >
                    <BsChevronCompactLeft size={30} />
                </div>
                <div
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                    onClick={nextSlide}
                >
                    <BsChevronCompactRight size={30} />
                </div>
            </div>
        </div>
    );
};

export default Feed;
