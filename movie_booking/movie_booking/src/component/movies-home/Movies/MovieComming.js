import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MovieService from "../../../service/HomeService/MovieService";

const MovieShowing = () => {
    const [listFilmComming, setListFilmComming] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMoviesComming();
    }, []);

    const getAllMoviesComming= async () => {
        const temp = await MovieService.getMovieComming();
        setListFilmComming(temp);
    };

    return (
        <div className="mt-14 mb-12">
            <div className="container">
                {/* Header Section */}
                <div className="text-center mb-10 max-w[600px] mx-auto ">
                    <h1 className="bg-slate-100 mb-12 mt-4 rounded-3xl border-solid border-stone-50 p-5 border-2 w-[96] text-2xl font-bold text-black">
                        Sắp công chiếu
                    </h1>
                </div>
                {/* Body */}
                <div>
                    <div
                        className="grid grid-rows-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
                        {listFilmComming.slice(0, 5).map((data) => (
                            <div key={data.id} className="relative group h-full w-full">
                                <div>
                                    <img
                                        src={data.avatar}
                                        alt="#"
                                        className="max-h-[320px] min-h-[300px] w-full object-cover rounded-md"
                                    />
                                    <div
                                        className="absolute inset-0 flex flex-col p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                        <h2 className="text-white text-center text-lg font-bold">{data.nameMovie}</h2>
                                        <div className="text-orange-400 items-center grid grid-rows-1">
                                            <p>⏰Thời lương:{data.durationMovie}</p>
                                        </div>
                                        <p className="text-white mb-2 text-center">Thể loại: {data.kindOfFilm.name}</p>
                                        <p className="text-white mb-2 text-center">Ngày Khởi Chiếu:</p>
                                        <p className="text-white mb-2 text-center">{data.releaseDate}</p>
                                        <div className="flex flex-col space-y-2">
                                            {data.statusFilmId.name === "Showing" && (
                                                <button
                                                    className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                                                    Đặt vé
                                                </button>
                                            )}
                                            <button
                                                className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                                                Thông tin
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* View all */}
                    <div className="flex justify-center ">
                        <button onClick={() => navigate("/search-movie")}
                                className="text-center cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600">
                            Xem thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieShowing;
