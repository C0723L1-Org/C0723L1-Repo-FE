import React, { useEffect, useState } from "react";
import * as MovieService from "../../service/HomeService/MovieService";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { treadmill } from 'ldrs'
import {Main} from "../../layout/main/Main";

treadmill.register()

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

    const [searchCriteria, setSearchCriteria] = useState({
        nameMovie: '',
        director: '',
        actor: '',
        nameStatus: '',
        releaseDate: '',
    });
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await searchMovieByAll('', '', '', '', '', pageNumber);
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

    const searchMovieByAll = async (nameMovie, director, actor, nameStatus, releaseDate, page) => {
        try {
            const response = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, actor, page);
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
        const { nameMovie = '', director = '', actor = '', nameStatus = '', releaseDate = '' } = data;
        setSearchCriteria({ nameMovie, director, actor, nameStatus, releaseDate });

        if (!nameMovie && !director && !releaseDate && !nameStatus && !actor) {
            toast.warning('Hãy nhập hoặc chọn một trường bất kỳ!');
            return searchMovieByAll('', '', '', '', '', pageNumber);
        }

        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await searchMovieByAll(nameMovie, director, actor, nameStatus, releaseDate, pageNumber);
            setLoading(false); // End loading
        } catch (error) {
            console.error("Search error:", error);
            toast.warning('No results found.');
            setMovies([]);
            setLoading(false);
        }
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
                        <h1 className="text-xl font-medium">Search</h1>
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="kind">Loại phim:</label>
                        <select
                            name="kind"
                            onChange={handleSearch}
                            id="kind"
                            className="w-full rounded-lg border border-gray-300 py-2 text-center
                            bg-gray-50 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                            "
                        >
                            <option value="">--Chọn loại phim--</option>
                            {kindOfMovie.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <label className="font-medium text-sm mb-1" htmlFor="nameMovie">Tên phim:</label>
                                <input
                                    {...register("nameMovie")}
                                    type="text"
                                    id="nameMovie"
                                    placeholder="Nhập tên phim"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-sm mb-1" htmlFor="actor">Diễn viên:</label>
                                <input
                                    {...register("actor")}
                                    type="text"
                                    id="actor"
                                    placeholder="Nhập diễn viên phim"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className=" flex justify-center text-center">
                            <div className="w-[1000px]">
                                <label className="font-medium text-sm mb-1" htmlFor="director">Đạo diễn:</label>
                                <input
                                    {...register("director")}
                                    type="text"
                                    id="director"
                                    placeholder="Nhập tên đạo diễn"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <label className="font-medium text-sm mb-1" htmlFor="date">Ngày phát hành:</label>
                                <input
                                    {...register("releaseDate")}
                                    type="date"
                                    id="date"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-sm mb-1" htmlFor="status">Trạng thái phim:</label>
                                <select
                                    {...register("nameStatus")}
                                    id="status"
                                    className="w-full rounded-lg border border-gray-300 py-2 text-center"
                                >
                                    <option value="">--Chọn trạng thái phim--</option>
                                    {statusMovie.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <button
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600"
                                type="submit"
                            >
                                Tìm kiếm
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
                <div className="space-y-6">
                    {movies.map(movie => (
                        <div key={movie.id}
                             className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center">
                            <img src={movie.avatar} alt={movie.nameMovie} className="h-40 w-30 object-cover"/>
                            <div className="p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{movie.nameMovie}</h2>
                                    <p className="text-gray-600">{movie.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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
            ) : (
                <div className="space-y-6">
                    {moviesKind.map(movie => (
                        <div key={movie.id}
                             className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center">
                            <img src={movie.avatar} alt={movie.nameMovie} className="h-40 w-30 object-cover"/>
                            <div className="p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{movie.nameMovie}</h2>
                                    <p className="text-gray-600">{movie.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center py-8">
                        <div className="flex space-x-4">
                            {pageNumber1 > 0 && (
                                <a
                                    className="h-10 px-4 font-semibold text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                    onClick={() => handlePage1(pageNumber1 - 1)}
                                >
                                    <CgArrowLeft className="mr-2"/>
                                    Trang trước
                                </a>
                            )}
                            {showPageNo1()}
                            {pageNumber1 < totalPages1 - 1 && (
                                <a
                                    className="h-10 px-4 font-semibold text-white bg-blue-500 hover:bg-blue-700 text-sm flex items-center justify-center rounded-full transition duration-200"
                                    onClick={() => handlePage1(pageNumber1 + 1)}
                                >
                                    Trang sau
                                    <CgArrowRight className="ml-2"/>
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
        }/>
    );
};

export default SearchMovies;
