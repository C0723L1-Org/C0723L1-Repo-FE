import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as MovieService from "../../service/MovieService";
import { Main } from "../../layout/main/Main";
import { toast } from "react-toastify";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

const Booking = () => {
    const [listFilmShowing, setListFilmShowing] = useState([]);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        document.title = `Đặt Vé` ;
        const fetchMoviesShowing = async () => {
            await getAllMoviesShowing(pageNumber);
        };
        fetchMoviesShowing();
    }, [pageNumber]);

    const getAllMoviesShowing = async (page) => {
        try {
            const temp = await MovieService.getMovieShowing(page);
            setListFilmShowing(temp.content);
            setTotalPages(temp.totalPages);
        } catch (er) {
            console.error("Error fetching movies coming:", er);
            toast.warning('Error fetching movies coming.');
        }
    };

    const showPageNo = () => {
        return Array.from({ length: totalPages }, (_, i) => (
            <a
                key={i}
                className={`h-10 w-10 hover:bg-orange-300 rounded-full font-semibold text-white text-sm flex items-center justify-center ${i === pageNumber ? 'bg-orange-400 text-white' : 'bg-orange-400 text-black'}`}
                onClick={() => handlePage(i)}
            >
                {i + 1}
            </a>
        ));
    };

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };
    const kindMapping = {
        Action: "Hành Động",
        Horno: "Kinh Dị",
        Funny: "Hài Hước",
    };

    return (
        <Main content={
            <div className="mt-14 mb-12">
                <div className="container">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
                        {listFilmShowing.map((data) => (
                            <div key={data.id} className="relative group w-full max-w-[300px]">
                                <img
                                    src={data.avatar}
                                    alt="#"
                                    className="h-full min-h-[300px] w-full object-cover rounded-md"
                                />
                                <div
                                    className="absolute inset-0 flex flex-col p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                    <h2 className="text-white text-center text-xl font-bold">{data.nameMovie}</h2>
                                    <div
                                        className=" text-white text-center items-center grid grid-rows-1">
                                        <p>⏰Thời lượng: <span
                                            className="text-orange-400">{data.durationMovie} phút </span>
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-center mb-2">
                                        {data.kindOfFilms && data.kindOfFilms.map((item) => (
                                            <span key={item.id}
                                                  className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm">
                                               {kindMapping[item.name] || item.name}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-white mb-2 text-center">
                                        Ngày Khởi Chiếu:
                                        <br/>
                                        <span className="text-orange-400">{formatDate(data.releaseDate)}</span>
                                    </p>
                                    <p className="text-white mb-2 text-center">
                                        Đạo Diễn: <span className="text-orange-400">{data.director}</span>
                                    </p>
                                    <div className="flex flex-col space-y-2">
                                        {data.statusFilmId.name === "Showing" && (
                                            <Link
                                                to={`/movie/${data.id}`}
                                                type="button"
                                                className="text-white justify-center font-semibold bg-[#f26b38] w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
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
                                                navigate(`/see-movie-details/${data.id}`);
                                            }}
                                            className="text-white justify-center font-semibold bg-[#f26b38] w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]">
                                            Thông tin
                                        </button>
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
                                    Trang trước
                                    <CgArrowLeft className="ml-2"/>
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
        } />
    );
};

export default Booking;