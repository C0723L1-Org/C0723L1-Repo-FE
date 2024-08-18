import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import * as MovieService from "../../service/HomeService/MovieService";
import {Main} from "../../layout/main/Main";

const Booking = () => {
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
        <Main content={
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
                                <div className="text-orange-400 text-center  items-center grid grid-rows-1">
                                    <p>⏰Thời lương:{data.durationMovie} phút</p>
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
                                        <Link
                                            to={`/movie/${data.id}`}
                                            type="button"
                                            className="text-white justify-center bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                        >
                                            <img
                                                alt="Logo Buy Ticket"
                                                width="400"
                                                height="250"
                                                className="mr-2"
                                                src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                                                style={{color: "transparent"}}
                                            />
                                            Mua vé
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            navigate(`/see-movie-details/${data.id}`);
                                        }}
                                        className="text-white justify-center bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]">
                                        Thông tin
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        }/>
    );
};

export default Booking;
