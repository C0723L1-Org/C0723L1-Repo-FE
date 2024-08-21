import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import * as MovieService from "../../../service/MovieService";
import { toast } from "react-toastify";

const MovieComming = () => {
    const [listFilmComming, setListFilmComming] = useState([]);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        const fetchMoviesComming = async () => {
            await getAllMoviesComming(pageNumber);
        };
        fetchMoviesComming();
    }, [pageNumber]);

    const getAllMoviesComming = async (page) => {
        try {
            const temp = await MovieService.getMovieComming(page);
            setListFilmComming(temp.content);
        } catch (error) {
            console.error("Error fetching movies coming:", error);
            toast.warning("Error fetching movies coming.");
        }
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <div className="mt-14 mb-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <h1 className="bg-slate-100 mb-12 mt-4 rounded-3xl border-solid border-stone-50 p-5 border-2 w-full text-2xl font-bold text-black">
                        Sắp công chiếu
                    </h1>
                </div>
                {/* Body */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
                        {listFilmComming &&
                            listFilmComming.slice(0,5).map((data) => (
                                <div
                                    key={data.id}
                                    className="relative group w-full max-w-[300px]"
                                >
                                    <div>
                                        <img
                                            src={data.avatar}
                                            alt="#"
                                            className="max-h-[350px] min-h-[300px] w-full object-cover rounded-md"
                                        />
                                        <div
                                            className="absolute inset-0 flex flex-col p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                            <h2 className="text-white text-center text-xl font-bold">
                                                {data.nameMovie}
                                            </h2>
                                            <div
                                                className=" text-white text-center items-center grid grid-rows-1">
                                                <p>⏰Thời lượng: <span
                                                    className="text-orange-400">{data.durationMovie} phút </span>
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center mb-2">
                                                {data.kindOfFilms &&
                                                    data.kindOfFilms.map(
                                                        (item) => (
                                                            <span
                                                                key={item.id}
                                                                className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm"
                                                            >
                                                                {item.name}
                                                            </span>
                                                        )
                                                    )}
                                            </div>
                                            <p className="text-white mb-2 text-center">
                                                Ngày Khởi Chiếu:
                                                <br/>
                                                <span className="text-orange-400">{formatDate(data.releaseDate)}</span>
                                            </p>
                                            <div className="flex flex-col space-y-2">
                                                {data.statusFilmId.name ===
                                                    "Showing" && (
                                                        <Link
                                                            to={`/movie/${data.id}`}
                                                            type="button"
                                                            className="text-white justify-center bg-[#f26b38] w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                        >
                                                            <img
                                                                alt="Logo Buy Ticket"
                                                                width="40"
                                                                height="200"
                                                                className="mr-2"
                                                                src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                                                                style={{color: "transparent"}}
                                                            />
                                                            Mua vé
                                                        </Link>
                                                    )}
                                                <button
                                                    onClick={() => {
                                                        navigate(
                                                            `/see-movie-details/${data.id}`
                                                        );
                                                    }}
                                                    className="text-white justify-center bg-[#f26b38] font-semibold w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                >
                                                    Thông Tin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* View all */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate("/search-movie")}
                            className="cursor-pointer px-5 py-2 rounded-lg mt-4 text-white justify-center font-semibold bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] text-sm text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                        >
                            Xem thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieComming;
