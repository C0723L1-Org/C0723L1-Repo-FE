import React, { useEffect, useState } from "react";
import * as MovieService from "../../../service/HomeService/MovieService";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CgArrowLeft, CgArrowRight} from "react-icons/cg";

const Studio = () => {
    const [movies, setMovies] = useState([]);
    const [kindOfMovie, setKindOfMovie] = useState([]); // Initialize as empty array
    const [statusMovie, setStatusMovie] = useState([]); // Initialize as empty array
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });

    useEffect(() => {
        const fetchMovies = async () => {
            await searchMovieByAll('', '', '', '', '', '', pageNumber);
        }
        fetchMovies();
    }, [pageNumber]);

    const searchMovieByAll = async (nameMovie, director, releaseDate, nameStatus, nameKind, actor, page) => {
        const temp = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, nameKind, actor, page);
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

    const getKindOfMovies = async () => {
        const temp = await MovieService.getKindOfMovie();
        setKindOfMovie(temp);
    };

    const getStatusMovies = async () => {
        const temp = await MovieService.getStatusMovie();
        setStatusMovie(temp);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            await getKindOfMovies();
            await getStatusMovies();
        }
        fetchMovies();
    }, []);

    const onSubmit = async (data) => {
        const nameMovie = data.nameMovie || '';
        const director = data.director || '';
        const releaseDate = data.releaseDate || '';
        const nameStatus = data.nameStatus || '';
        const nameKind = data.nameKind || '';
        const actor = data.actor || '';

        if (!nameMovie && !director && !releaseDate && !nameStatus && !nameKind && !actor) {
            toast.warning('Please enter at least one search criteria');
            return;
        }

        try {
            const temp = await MovieService.getSearchMovie(nameMovie, director, releaseDate, nameStatus, nameKind, actor, pageNumber);
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
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Thích</button>
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
                            <CgArrowLeft className="fas fa-arrow-right ml-2" />
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
