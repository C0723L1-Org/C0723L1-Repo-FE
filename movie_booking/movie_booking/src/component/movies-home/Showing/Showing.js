import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MovieService from "../../../service/HomeService/MovieService";

const Showing = () => {
    const [listFilmShowing, setListFilmShowing] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMoviesShowing();
    }, []);

    const getAllMoviesShowing = async () => {
        const temp = await MovieService.getMovieShowing();
        setListFilmShowing(temp);
    };

    return (
        <div className="mt-14 mb-12">
            <div className="container">
                <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
                    {listFilmShowing.map((data) => (
                        <div key={data.id} className="relative group h-full w-full">
                            <img
                                src={data.avatar}
                                alt="#"
                                className="h-full min-h-[300px] w-full object-cover rounded-md"
                            />
                            <div
                                className="absolute inset-0 flex flex-col p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                <h2 className="text-white text-center text-lg font-bold">{data.nameMovie}</h2>
                                <div className="text-orange-400 items-center grid grid-rows-1">
                                    <p>⏰Thời lương:{data.durationMovie}</p>
                                </div>
                                <div className="flex flex-wrap justify-center mb-2">
                                    {data.kindOfFilms && data.kindOfFilms.map((item) => (
                                        <span key={item.id}
                                              className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm">
                                                    {item.name}
                                                </span>
                                    ))}
                                </div>
                                <p className="text-white mb-2 text-center">Ngày Khởi Chiếu:<br/>
                                    {data.releaseDate}
                                </p>
                                <div className="flex flex-col space-y-2">
                                    {data.statusFilmId.name === "Showing" && (
                                        <button
                                            onClick={() => {
                                                navigate(`/movie/${data.id}`);
                                            }}
                                            className=" w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                                            Đặt vé
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            navigate(`/movie/information/${data.id}`);
                                        }}
                                        className=" w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                                        Thông tin
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Showing;
