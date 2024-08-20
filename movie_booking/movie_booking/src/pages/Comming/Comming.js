import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MovieService from "../../service/HomeService/MovieService";
import { infinity } from "ldrs";
import { Main } from "../../layout/main/Main";
import { toast } from "react-toastify";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

infinity.register();

const Comming = () => {
    const [listFilmComming, setListFilmComming] = useState([]);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
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
            setTotalPages(temp.totalPages);
        } catch (error) {
            console.error("Error fetching movies comming:", error);
            toast.warning("Error fetching movies comming.");
        }
    };

    const showPageNo = () => {
        return Array.from({ length: totalPages }, (_, i) => (
            <a
                key={i}
                className={`h-10 w-10 hover:bg-blue-700 rounded-full font-semibold text-sm flex items-center justify-center ${
                    i === pageNumber ? "bg-blue-500 text-white" : "bg-blue-500 text-black"
                }`}
                onClick={() => handlePage(i)}
            >
                {i + 1}
            </a>
        ));
    };

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    };

    return (
        <Main
            content={
                <div className="mt-14 mb-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
                            {listFilmComming?.map((data) => (
                                <div key={data.id} className="relative group h-full w-full">
                                    <div>
                                        <img
                                            src={data.avatar}
                                            alt="#"
                                            className="h-full min-h-[300px] w-full object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 flex flex-col p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                            <h2 className="text-white text-center text-lg font-bold">
                                                {data.nameMovie}
                                            </h2>
                                            <div className="text-orange-400 text-center items-center grid grid-rows-1">
                                                <p>⏰Thời lượng: {data.durationMovie} phút</p>
                                            </div>
                                            <div className="flex flex-wrap justify-center mb-2">
                                                {data.kindOfFilms &&
                                                    data.kindOfFilms.map((item) => (
                                                        <span
                                                            key={item.id}
                                                            className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm"
                                                        >
                                                            {item.name}
                                                        </span>
                                                    ))}
                                            </div>
                                            <p className="text-white mb-2 text-center">
                                                Ngày Khởi Chiếu:
                                                <br />
                                                {data.releaseDate}
                                            </p>
                                            <div className="flex flex-col space-y-2">
                                                {data.statusFilmId.name === "Showing" && (
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/movie/${data.id}`);
                                                        }}
                                                        className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                                                    >
                                                        Đặt vé
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        navigate(`/see-movie-details/${data.id}`);
                                                    }}
                                                    className="text-white justify-center bg-[#f26b38] w-full h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                >
                                                    Thông tin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center py-8">
                            <div className="flex space-x-2">
                                {pageNumber > 0 && (
                                    <a
                                        className="h-10 px-4 font-semibold text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                        onClick={() => handlePage(pageNumber - 1)}
                                    >
                                        <CgArrowLeft className="mr-2" />
                                        Trang trước
                                    </a>
                                )}
                                {showPageNo()}
                                {pageNumber < totalPages - 1 && (
                                    <a
                                        className="h-10 px-4 font-semibold text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                        onClick={() => handlePage(pageNumber + 1)}
                                    >
                                        Trang sau
                                        <CgArrowRight className="ml-2" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default Comming;
