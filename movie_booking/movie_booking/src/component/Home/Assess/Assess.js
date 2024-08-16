import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AssessData = [
    {
        id: 1,
        name: "A",
        description: "Phim rất hay tôi không thích rạp như quần què",
        img: "https://picsum.photos/id/237/200/300",
    },
    {
        id: 2,
        name: "B",
        description: "Không bao giờ tới rạp này một lần nào nữa!",
        img: "https://picsum.photos/200",
    },
    {
        id: 3,
        name: "C",
        description: "Deadpool 3 hay vcl !!",
        img: "https://picsum.photos/seed/picsum/200/300",
    },
    {
        id: 4,
        name: "D",
        description: "Rạp chán ghế toàn loại hết đát",
        img: "https://picsum.photos/200/300?grayscale",
    },
    {
        id: 5,
        name: "E",
        description: "Phim rất hay tôi không thích rạp ",
        img: "https://picsum.photos/200/300/?blur",
    },
];

const Assess = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlides: 2,
                    centerMode: true,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                },
            },
        ],
    };

    return (
        <div className="py-10 mb-10">
            <div className="container mx-auto px-4">
                {/* Header section */}
                <div className="text-center mb-10">
                    <h1 className="bg-slate-100 mb-12 mt-4 rounded-3xl border-solid border-stone-50 p-5 border-2 w-full text-2xl font-bold text-black">
                        Đánh giá của khách hàng
                    </h1>
                </div>
                {/* Assess */}
                <div className="bg-white">
                    <Slider {...settings}>
                        {AssessData.map((data) => (
                            <div key={data.id} className="flex flex-col gap-5 shadow-lg py-10 px-6 mx-4 rounded-xl border-2">
                                <div className="flex justify-center mb-4">
                                    <img src={data.img} alt={data.name} className="rounded-full w-20 h-20"/>
                                </div>
                                <div className="flex flex-col gap-4 items-center mb-4">
                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-500">{data.description}</p>
                                        <h1 className="text-xl text-center font-bold text-black/80">{data.name}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Assess;
