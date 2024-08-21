import React, { useEffect, useState } from "react";
import * as MovieService from "../../service/MovieService";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { treadmill } from 'ldrs'
import { Main } from "../../layout/main/Main";
import {Link, useNavigate} from "react-router-dom";

treadmill.register();

const SearchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [moviesKind, setMoviesKind] = useState([]);
    const [kindOfMovie, setKindOfMovie] = useState([]);
    const [statusMovie, setStatusMovie] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumber1, setPageNumber1] = useState(0);
    const [totalPages1, setTotalPages1] = useState(0);
    const [kind, setKind] = useState('');
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
    const navigate = useNavigate();

    const [searchCriteria, setSearchCriteria] = useState({
        nameMovie: '',
        director: '',
        actor: '',
        nameStatus: '',
        releaseDate: '',
        studio: '',
    });

    useEffect(() => {
        const fetchMovies = async () => {
            document.title = `Phim Điện Ảnh` ;
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await searchMovieByAll('', '', '', '', '', '', pageNumber);
            setLoading(false);
        };
        fetchMovies();
    }, [pageNumber]);

    useEffect(() => {
        const fetchMoviesByKindOfFilm = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await searchMovieByKindOfFilm(kind, pageNumber1);
            setLoading(false);
        };
        fetchMoviesByKindOfFilm();
    }, [kind, pageNumber1]);

    const searchMovieByAll = async (nameMovie, director, releaseDate, nameStatus, actor, studio, page) => {
        try {
            const response = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, actor, studio, page);
            setMovies(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching movies:", error);
            toast.warning('Error fetching movies.');
        }
    };

    const searchMovieByKindOfFilm = async (nameKind, page) => {
        try {
            const response = await MovieService.getSearchMovieByKindOfFilm(nameKind, page);
            setMoviesKind(response.content);
            setTotalPages1(response.totalPages);
        } catch (error) {
            console.error("Error fetching movies by kind:", error);
            toast.warning('Error fetching movies by kind.');
        }
    };

    const handlePage = (pageNo) => {
        searchMovieByAll(
            searchCriteria.nameMovie,
            searchCriteria.director,
            searchCriteria.actor,
            searchCriteria.nameStatus,
            searchCriteria.releaseDate,
            searchCriteria.studio,
            pageNo
        );
    };

    const showPageNo = () => {
        return Array.from({ length: totalPages }, (_, i) => (
            <a
                key={i}
                className={`h-10 w-10 hover:bg-blue-700 rounded-full font-semibold text-white text-sm flex items-center justify-center ${i === pageNumber ? 'bg-blue-500 text-white' : 'bg-blue-500 text-black'}`}
                onClick={() => handlePage(i)}
            >
                {i + 1}
            </a>
        ));
    };

    const handlePage1 = (pageNo1) => {
        setPageNumber1(pageNo1);
    };

    const showPageNo1 = () => {
        return Array.from({ length: totalPages1 }, (_, i) => (
            <a
                key={i}
                className={`h-10 w-10 hover:bg-blue-700 rounded-full font-semibold text-white text-sm flex items-center justify-center ${i === pageNumber1 ? 'bg-blue-500 text-white' : 'bg-blue-500 text-black'}`}
                onClick={() => handlePage1(i)}
            >
                {i + 1}
            </a>
        ));
    };

    const getKindOfMovies = async () => {
        try {
            const response = await MovieService.getKindOfMovie();
            setKindOfMovie(response);
        } catch (error) {
            console.error("Error fetching kind of movies:", error);
            toast.warning('Error fetching kind of movies.');
        }
    };

    const getStatusMovies = async () => {
        try {
            const response = await MovieService.getStatusMovie();
            setStatusMovie(response);
        } catch (error) {
            console.error("Error fetching status movies:", error);
            toast.warning('Error fetching status movies.');
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            await getKindOfMovies();
            await getStatusMovies();
        };
        fetchInitialData();
    }, []);

    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (name === 'kind') setKind(value);
    };

    const onSubmit = async (data) => {
        const { nameMovie = '', director = '', actor = '', nameStatus = '', releaseDate = '', studio = '' } = data;
        setSearchCriteria({ nameMovie, director, actor, nameStatus, releaseDate, studio });
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await searchMovieByAll(nameMovie, director, actor, nameStatus, releaseDate, studio, pageNumber);
            setLoading(false);
        } catch (error) {
            console.error("Search error:", error);
            toast.warning('No results found.');
            setMovies([]);
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const statusMapping = {
        Comming: "Sắp chiếu",
        Showing: "Đang chiếu",
        End: "Đã kết thúc",
    };
    const kindMapping = {
        Action: "Hành Động",
        Horno: "Kinh Dị",
        Funny: "Hài Hước",
    };

    return (
        <Main content={
            <div className="container mx-auto mt-8 mb-10 px-4">
                <ToastContainer />
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-white px-6 py-8 rounded-xl shadow-lg w-full">
                        <div className="text-center max-w-[600px] mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900">PHIM ĐIỆN ẢNH</h1>
                        </div>
                        <div className="flex items-center mb-4">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800 mr-2">
                            <FiSearch />
                        </span>
                            <h1 className="text-xl font-medium">Tìm Kiếm</h1>
                        </div>
                        <div className="flex flex-col mb-4 mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="kind">
                               Thể Loại Phim:
                            </label>
                            <select
                                name="kind"
                                onChange={handleSearch}
                                id="kind"
                                className="w-full rounded-lg border border-gray-300 py-2 text-center bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Thể Loại</option>
                                {kindOfMovie.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {kindMapping[item.name] || item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm mb-1" htmlFor="nameMovie">Tên Phim:</label>
                                    <input
                                        {...register("nameMovie")}
                                        type="text"
                                        id="nameMovie"
                                        placeholder="Nhập tên phim"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm mb-1" htmlFor="director">Đạo Diễn:</label>
                                    <input
                                        {...register("director")}
                                        type="text"
                                        id="director"
                                        placeholder="Nhập tên đạo diễn"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm mb-1" htmlFor="actor">Diễn Viên:</label>
                                    <input
                                        {...register("actor")}
                                        type="text"
                                        id="actor"
                                        placeholder="Nhập tên diễn viên"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm mb-1" htmlFor="releaseDate">Ngày Công
                                        Chiếu:</label>
                                    <input
                                        {...register("releaseDate")}
                                        type="date"
                                        id="releaseDate"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-sm mb-1" htmlFor="nameStatus">Trạng Thái
                                    Phim:</label>
                                <select
                                    {...register("nameStatus")}
                                    id="nameStatus"
                                    className="w-full rounded-lg border border-gray-300 py-2 text-center bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Đang Chiếu / Sắp Chiếu / Kết Thúc</option>
                                    {statusMovie.map((item, index) => (
                                        <option key={index} value={item.name}>
                                            {statusMapping[item.name] || item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-32 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700"
                                >
                                    Tìm Kiếm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <l-treadmill
                            size="100"
                            speed="1.3"
                            color="blue"
                        ></l-treadmill>
                    </div>
                ) : !kind ? (
                    <div className="mt-14 mb-12">
                        <div className="container mx-auto px-4">
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center justify-center">
                                {movies?.map((data) => (
                                    <div key={data.id} className="relative group h-full w-full">
                                        <div>
                                            <img
                                                src={data.avatar}
                                                alt="#"
                                                className="h-[400px] min-h-[300px] w-full object-cover rounded-md"
                                            />
                                            <div
                                                className="absolute inset-0 flex flex-col justify-center p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                                <h2 className="text-white text-center text-xl font-bold">
                                                    {data.nameMovie}
                                                </h2>
                                                <div
                                                    className=" text-white text-center items-center grid grid-rows-1">
                                                    <p>⏰Thời Lượng: <span className="text-orange-400">{data.durationMovie} phút </span>
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap justify-center mb-2">
                                                    {data.kindOfFilms &&
                                                        data.kindOfFilms.map((item) => (
                                                            <span
                                                                key={item.id}
                                                                className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm"
                                                            >
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
                                                    Diễn Viên: <span className="text-orange-400">{data.actor}</span>
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
                                                            Mua Vé
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            navigate(
                                                                `/see-movie-details/${data.id}`
                                                            );
                                                        }}
                                                        className="text-white justify-center font-semibold bg-[#f26b38] w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                    >
                                                        Thông Tin
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
                                            className="h-10 px-4  text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                            onClick={() => handlePage(pageNumber - 1)}
                                        >
                                            <CgArrowLeft className="mr-2"/>
                                            Trang Trước
                                        </a>
                                    )}
                                    {showPageNo()}
                                    {pageNumber < totalPages - 1 && (
                                        <a
                                            className="h-10 px-4  text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                            onClick={() => handlePage(pageNumber + 1)}
                                        >
                                            Trang Sau
                                            <CgArrowRight className="ml-2"/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-14 mb-12">
                        <div className="container mx-auto px-4">
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center justify-center">
                                {moviesKind?.map((data) => (
                                    <div key={data.id} className="relative group h-full w-full">
                                        <div>
                                            <img
                                                src={data.avatar}
                                                alt="#"
                                                className="h-full min-h-[300px] w-full object-cover rounded-md"
                                            />
                                            <div
                                                className="absolute inset-0 flex flex-col justify-center p-4 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                                <h2 className="text-white text-center text-lg font-bold">
                                                    {data.nameMovie}
                                                </h2>
                                                <div
                                                    className="text-orange-400 text-center items-center grid grid-rows-1">
                                                    <p>⏰Thời lượng: {data.durationMovie} phút</p>
                                                </div>
                                                <div className="flex flex-wrap justify-center mb-2">
                                                    {data.kindOfFilms &&
                                                        data.kindOfFilms.map((item) => (
                                                            <span
                                                                key={item.id}
                                                                className="bg-orange-400 text-white px-2 py-1 m-1 rounded-full text-sm"
                                                            >
                                                               {kindMapping[item.name] || item.name}
                                                        </span>
                                                        ))}
                                                </div>
                                                <p className="text-white mb-2 text-center">
                                                    Ngày Khởi Chiếu:
                                                    <br/>
                                                    <span
                                                        className="text-orange-400">{formatDate(data.releaseDate)}</span>
                                                </p>
                                                <p className="text-white mb-2 text-center">
                                                    Diễn Viên: <span className="text-orange-400">{data.actor}</span>
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
                                                            Mua Vé
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            navigate(
                                                                `/see-movie-details/${data.id}`
                                                            );
                                                        }}
                                                        className="text-white justify-center font-semibold  bg-[#f26b38] w-[150px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                    >
                                                        Thông Tin
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center py-8">
                                <div className="flex space-x-2">
                                    {pageNumber1 > 0 && (
                                        <a
                                            className="h-10 px-4  text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                            onClick={() => handlePage1(pageNumber1 - 1)}
                                        >
                                            <CgArrowLeft className="mr-2"/>
                                            Trang Trước
                                        </a>
                                    )}
                                    {showPageNo1()}
                                    {pageNumber1 < totalPages1 - 1 && (
                                        <a
                                            className="h-10 px-4 text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                            onClick={() => handlePage1(pageNumber1 + 1)}
                                        >
                                            Trang Sau
                                            <CgArrowRight className="ml-2"/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        }/>
    );
};

export default SearchMovies;
