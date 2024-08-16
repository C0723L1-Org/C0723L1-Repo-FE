import React from "react";
import { GrLike } from "react-icons/gr";

const Top3MoviesMostLike = [
    {
        id: 1,
        img: "https://www.themoviedb.org/t/p/w1280/lfY2CfmxyN9OvxmFuap6aejViJn.jpg",
        name: "Deadpool và Wolverine",
        like: "10000000",
    },
    {
        id: 2,
        img: "https://www.themoviedb.org/t/p/w1280/lfY2CfmxyN9OvxmFuap6aejViJn.jpg",
        name: "Deadpool và Wolverine",
        like: "999999",
    },
    {
        id: 3,
        img: "https://www.themoviedb.org/t/p/w1280/lfY2CfmxyN9OvxmFuap6aejViJn.jpg",
        name: "Deadpool và Wolverine",
        like: "888888",
    },
];

const TopMovies = () => {
    return (
        <div>
            <div className="container">
                {/*Header*/}
                <div className="text-center mb-10 max-w[600px] mx-auto ">
                    <h1 className="bg-slate-100 mb-24 mt-4 rounded-3xl border-solid border-stone-50 p-5 border-2 w-[96] text-2xl font-bold text-black">
                        Top 3 Phim Hot Tháng 8
                    </h1>
                </div>
                {/*Body*/}
                <div className="grid grid-cols-1 bg-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-5 place-items-center border-none">
                    {Top3MoviesMostLike.map((data) => (
                        <div
                            key={data.id}
                            className=" hover:text-dark relativeduration-200 group max-w-[330px] border-none"
                        >
                            <div className="justify-center transform group-hover:scale-105 duration-300 hover:text-blue-400">
                                <img
                                    src={data.img}
                                    alt=""
                                    className="max-w-[320px] block mx-auto shadow-2xl  cursor-pointer -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                                />
                                {/*Information*/}
                                <div className="text-center justify-center -mt-12">
                                    <div className="w-full flex items-center justify-center gap-1 ">
                                        <button>
                                            <GrLike className="w-[30px] h-[30px] hover:text-orange-300" />
                                        </button>
                                        {data.like}
                                    </div>
                                    <p className="text-xl font-bold">{data.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopMovies;
