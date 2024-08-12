import React, { useEffect, useState } from "react";
import * as MovieService from "../../../service/HomeService/MovieService";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CgArrowLeft, CgArrowRight} from "react-icons/cg";
import {FiSearch} from "react-icons/fi";

const Studio = () => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });

    useEffect(() => {
        const fetchMovies = async () => {
            await searchMovieByAll('', '', '', '', '', pageNumber);
        }
        fetchMovies();
    }, [pageNumber]);

    const searchMovieByAll = async (nameMovie, director, releaseDate, nameStatus, actor, page) => {
        const temp = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, actor, page);
        setMovies(temp.content);
        setTotalPages(temp.totalPages);
    };

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    }

    const showPageNo = () => {
        let pageNoTags = [];
        for (let i = 0; i < totalPages; i++) {
            pageNoTags.push(
                <a
                    key={i}
                    className={`h-10 w-10 hover:bg-blue-700 font-semibold text-white text-sm flex items-center justify-center ${i === pageNumber ? 'bg-blue-500 text-white' : 'bg-blue-500 text-black'}`}
                    onClick={() => handlePage(i)}
                >
                    {i + 1}
                </a>
            );
        }
        return pageNoTags;
    }


    const onSubmit = async (data) => {
        const nameMovie = data.nameMovie || '';
        const director = data.director || '';
        const releaseDate = data.releaseDate || '';
        const nameStatus = data.nameStatus || '';
        const actor = data.actor || '';

        if (!nameMovie && !director && !releaseDate && !nameStatus && !actor) {
            toast.warning('Please enter at least one search criteria');
            return;
        }

        try {
            const temp = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, actor, pageNumber);
            setMovies(temp.content);
            setTotalPages(temp.totalPages);
        } catch (e) {
            toast.warning('Không có điều bạn tìm kiếm!!!');
            setMovies([]);
        }
    }

    return (
        <div className="container mx-auto mt-8 mb-10 px-4">
            <ToastContainer />
            <div className="flex justify-center items-center mb-4">
                <div className="bg-white px-6 py-8 rounded-xl shadow-lg w-full ">
                    <div className="text-center max-w-[600px] mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900">NHÀ SẢN SUẤT</h1>
                    </div>
                    <div className="flex items-center mb-4">
                        <span
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800 mr-2">
                            <FiSearch/>
                        </span>
                        <h1 className="text-xl font-medium">Search</h1>
                    </div>
                    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="flex flex-col col-span-2">
                                <label className="font-medium text-sm mb-1" htmlFor="studio">Tên Studio:</label>
                                <input {...register("director")} type="text" id="studio"
                                       placeholder="Nhập tên studio"
                                       className="w-full rounded-lg border border-gray-300 px-3 py-2"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <button
                                className="bg-blue-500 justify-center items-center text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-600"
                                type="submit">
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="space-y-6">
                {movies.map(movie => (
                    <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center">
                        <img src={movie.avatar} alt={movie.studio} className="h-40 w-30 object-cover"/>
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold">{movie.studio}</h2>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Thích
                                </button>
                                <span className="text-gray-600">10000</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center py-8">
                <div className="flex space-x-2">
                    {pageNumber > 0 && (
                        <a className="h-10 w-15 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
                           onClick={() => handlePage(pageNumber - 1)}>Trang trước
                            <CgArrowLeft className="fas fa-arrow-right ml-2"/>
                        </a>
                    )}
                    {showPageNo()}
                    {pageNumber < totalPages - 1 && (
                        <a className="h-10 w-15 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
                           onClick={() => handlePage(pageNumber + 1)}>Trang sau
                            <CgArrowRight className="fas fa-arrow-right ml-2" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Studio;
