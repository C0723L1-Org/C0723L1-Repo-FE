import {SidebarCollection} from "./SidebarCollection.js";
import {useEffect, useState} from "react";
import * as movieService from "../../service/HomeService/MovieService"
import Swal from "sweetalert2";
import {Header} from "./Header";
import {DataNotFound} from "./DataNotFound";
import {Link, useNavigate} from "react-router-dom";
import {Main} from "../../layout/main/Main";
import {useSelector} from "react-redux";

export const MovieManager = () => {
    const [loading, setLoading] = useState(true);
    const [kindOfMovie, setKindOfMovie] = useState([]);
    const [statusMovie, setStatusMovie] = useState([]);
    const [listSearchMovie, setListSearchMovie] = useState([]);
    const [numberElement, setNumberElement] = useState(0);
    const [numberTotalPage, setNumberTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const recordPerPage = 2;
    const numbers = Array.from({ length: numberTotalPage }, (_, i) => i + 1);
    const user = useSelector(state => state.user.user)

    const getKindOfMovies= async () => {
        const temp = await movieService.getFindAllKindOfFilm();
        setKindOfMovie(temp);
    };
    const getStatusMovies= async () => {
        const temp = await movieService.getFindAllStatus();
        console.log(temp)
        setStatusMovie(temp);
    };
    const getMovieFindAll= async () => {
        const temp = await movieService.getFindAllMovie(currentPage, recordPerPage);
        console.log(temp.totalElements)
        setListSearchMovie(temp.content);
        setNumberElement(temp.totalElements);
        setNumberTotalPage(temp.totalPages);
        setLoading(false);
    };
    useEffect(() => {
        getMovieFindAll();
    }, [currentPage]);
    const searchMovieByAll = async (nameMovie, content, director, releaseDateFrom, releaseDateTo, nameStatus, actor, currentPage, recordPerPage) => {
        const temp = await movieService.searchMovie(nameMovie, content, director, releaseDateFrom, releaseDateTo, nameStatus, actor, currentPage, recordPerPage);
        console.log(temp)
        setListSearchMovie(temp.content);
        setNumberElement(temp.totalElements);
        setNumberTotalPage(temp.totalPages);
        setLoading(false);
    };
    const handleSearchs = async (e) =>{
        e.preventDefault();
        // const checkboxes = document.querySelectorAll('.kinds');
        // // const  kindIds = [];
        //
        // checkboxes.forEach(checkbox =>{
        //     if(checkbox.checked){
        //         kindIds.push(checkbox.value);
        //     }
        // })
        const name = e.target.nameMovie.value;
        const content = e.target.content.value;
        const director = e.target.director.value;
        const releaseDateFrom = e.target.releaseDateFrom.value;
        const releaseDateTo = e.target.releaseDateTo.value;
        const status = e.target.status.value;
        const actor = e.target.actor.value;
        await searchMovieByAll(name, content, director, releaseDateFrom, releaseDateTo, status, actor, currentPage, recordPerPage);
    }
    const changePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeNPage = (id) => {
        setCurrentPage(id);
    };

    const changeNext = () => {
        if (currentPage < numberTotalPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleDeletelMovies = () =>{
        const checkboxes = document.querySelectorAll('.checkboxMovies');
        const  movieIds = [];

        checkboxes.forEach(checkbox =>{
            if(checkbox.checked){
                movieIds.push(checkbox.value);
            }
        })
        Swal.fire({
            title: "Bạn chắc chắn xóa các sựu lựa chọn không ?",
            text: "Bạn sẽ không thể hoàn nguyên điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                Swal.fire({
                        title: "Deleted!",
                        text: "Bạn muốn xóa",
                        icon: "success"
                    }
                );
                movieService.deleteByIds(movieIds);
                getMovieFindAll();
            }
        });
    }
    const handleDeletel = (id, name) =>{
        Swal.fire({
            title: "Bạn chắc chắn xóa "+name+" không",
            text: "Bạn sẽ không thể hoàn nguyên điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Bạn muốn xóa",
                    icon: "success"
                }
                );
                movieService.deleteById(id);
                getMovieFindAll();

            }
        });
    }
    const againSetListMovie = async (e) =>{
       await getMovieFindAll();
        document.getElementById("nameMovie").value = '';
        document.getElementById("content").value = '';
        document.getElementById("director").value = '';
        document.getElementById("releaseDateFrom").value = '';
        document.getElementById("releaseDateTo").value = '';
        document.getElementById("status").value = '';
        document.getElementById("actor").value = '';
    }

    useEffect(() =>{
        // searchMovieByAll();
        getKindOfMovies();
        getStatusMovies();
        // getMovieFindAll();
        setTimeout(() =>{
            getMovieFindAll();
        }, 2000)
    }, [])
    return(
    <Main content={
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 z-50 max-md:col-span-2 max-lg:col-span-2 min-xl:col-span-3">
                  <div className="h-full">
                      <SidebarCollection/>
                  </div>
              </div>
                <div
                    className="col-span-9 max-md:col-span-10 max-lg:ml-4 max-lg:col-span-10 min-xl:col-span-9 pt-4 pr-7">
                    <div className="w-full">
                        <Header/>
                    </div>
                    <div className="bg-white px-4 py-6 mx-4 rounded-xl shadow-lg mt-10">
                        <div className="flex gap-2">
                          <span
                              className="inline-flex justify-center items-center size-[36px] rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800 relative bottom-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                   stroke="currentColor"
                                   className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                              </svg>
                        </span>
                            <h1 className="text-xl font-medium ">Search</h1>
                        </div>

                        <form className="space-y-2  max-lg:flex-col max-lg:grid " onSubmit={(e) => handleSearchs(e)}>
                            <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                                <div className="flex-col justify-center items-center">
                                    <label className="font-medium text-[14px]" htmlFor="nameMovie">Tên phim:</label>
                                    <input type="text" name="nameMovie" id="nameMovie" placeholder="Nhập tên phim"
                                           className="w-full rounded-lg border border-gray-300 mr-2 px-3 py-1"/>
                                </div>
                                <div className="flex-col justify-center items-center">
                                    <label className="font-medium text-[14px]" htmlFor="actor">Diễn viên chính:</label>
                                    <input type="text" name="actor" id="actor" placeholder="Nhập diễn viên phim"
                                           className="w-full rounded-lg border border-gray-300 mr-2 px-3 py-1"/>
                                </div>
                            </div>

                            <div className="flex-col grid grid-cols-4 gap-5 max-lg:grid-cols-1">
                                <div className="flex-col justify-center items-center max-lg:col-span-4">
                                    <label className="font-medium text-[14px]" htmlFor="releaseDateFrom">Ngày phát hành
                                        từ:</label>
                                    <input type="date" name="releaseDateFrom" id="releaseDateFrom"
                                           className="w-full rounded-lg border border-gray-300 mr-2 px-3 min-xl:py-1"/>
                                </div>
                                <div className="flex-col clear-both justify-center items-center max-lg:col-span-4">
                                    <label className="font-medium text-[14px]" htmlFor="releaseDateTo">Ngày phát hành
                                        đến:</label>
                                    <input type="date" name="releaseDateTo" id="releaseDateTo"
                                           className="w-full rounded-lg border border-gray-300 mr-2 px-3 min-xl:py-1"/>
                                </div>
                                <div className="flex-col justify-center items-center col-span-2 max-lg:col-span-4">
                                    <label className="font-medium text-[14px]" htmlFor="status">Trạng thái phim:</label>
                                    <select name="status" id="status"
                                            className="w-full rounded-lg border min-xl:py-1 border-gray-300 mr-2 text-center">
                                        <option value="">--Chọn loại phim--</option>
                                        {
                                            statusMovie.map((i, index) => (
                                                <option key={index} value={i.name}>{i.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-5 max-lg:grid-cols-1">
                                <div className="flex-col justify-center items-center col-span-2 max-lg:grid-cols-5">
                                    <label className="font-medium text-[14px]" htmlFor="director">Đạo diễn:</label>
                                    <input type="text" name="director" id="director" placeholder="Nhập đạo diễn phim"
                                           className="w-full rounded-lg border border-gray-300 mr-2 px-3 py-1"/>
                                </div>
                                <div className="flex-col justify-center items-center col-span-3 max-lg:grid-cols-5">
                                    <label className="font-medium text-[14px]" htmlFor="content">Nội dung:</label>
                                    <textarea name="content" id="content" cols="10" rows="10"
                                              className="w-full h-10 rounded-lg border border-gray-300 mr-2 px-1 py-1 pl-2"></textarea>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="flex gap-1 items-center justify-center bg-rose-500 text-cyan-50 py-1 px-2 rounded-md"
                                    type="submit">
                                    <svg className="h-5 text-center text-white white:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <p>Tìm kiếm</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={againSetListMovie}
                                    className="flex gap-1 items-center justify-center bg-green-700 text-black py-1 px-2 rounded-md"
                                >
                                    <svg className="h-5 text-center text-black" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                                    </svg>
                                    <p>Đặt lại</p>
                                </button>
                            </div>
                        </form>
                    </div>
                    {/*Danh sách*/}
                    <div
                        className="w-full flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mt-20 px-8 max-md:overflow-x-auto">
                        <div className="relative flex justify-between items-center bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800
                              text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
                            <h5 className="block antialiased tracking-normal -z-1 font-sans text-2xl font-semibold leading-relaxed text-white">Danh
                                sách phim</h5>
                            <Link to="/create-movie">
                                <button
                                    className="flex gap-1 bg-gradient-to-tr from-green-500 to-green-300 text-white px-5 py-2 rounded-lg mt-2"
                                    type="submit">
                                    <svg className="h-6 text-center text-white dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <p>Thêm mới</p></button>
                            </Link>
                        </div>
                        <div className="p-6 px-0 pt-0 pb-2 space-y-6 col-span-5">
                            <table
                                className=" w-full min-w-[640px] table-auto min-xl:flex min-xl:flex-col lg:items-center max-lg:flex max-lg:flex-row">
                                <thead>
                                <tr className="text-left max-lg:flex max-lg:flex-col lg:w-1/4">
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Tên phim</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Loại phim</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Trạng thái</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Diễn viên chính</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Ngày phát hành</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Thời lượng</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50">Chức năng</th>
                                    <th className="py-3 px-5 border-b border-blue-gray-50 text-left">
                                        <button onClick={(e) => handleDeletelMovies(e)}
                                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-red-700 border-0 border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white mr-3">
                                            Xóa
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                {loading ? (
                                    <tr className="col-span-6">
                                        <svg className="text-[40px]" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200"
                                             height="200" style={{
                                            shapeRendering: 'auto',
                                            display: 'block',
                                            background: 'rgb(255, 255, 255)'
                                        }}>
                                            <g>
                                                <g>
                                                    <circle fill="#dc856d" r="4" cy="50" cx="60">
                                                        <animate begin="-0.67s" keyTimes="0;1" values="95;35" dur="1s"
                                                                 repeatCount="indefinite" attributeName="cx"></animate>
                                                        <animate begin="-0.67s" keyTimes="0;0.2;1" values="0;1;1"
                                                                 dur="1s" repeatCount="indefinite"
                                                                 attributeName="fill-opacity"></animate>
                                                    </circle>
                                                    <circle fill="#dc856d" r="4" cy="50" cx="60">
                                                        <animate begin="-0.33s" keyTimes="0;1" values="95;35" dur="1s"
                                                                 repeatCount="indefinite" attributeName="cx"></animate>
                                                        <animate begin="-0.33s" keyTimes="0;0.2;1" values="0;1;1"
                                                                 dur="1s" repeatCount="indefinite"
                                                                 attributeName="fill-opacity"></animate>
                                                    </circle>
                                                    <circle fill="#dc856d" r="4" cy="50" cx="60">
                                                        <animate begin="0s" keyTimes="0;1" values="95;35" dur="1s"
                                                                 repeatCount="indefinite" attributeName="cx"></animate>
                                                        <animate begin="0s" keyTimes="0;0.2;1" values="0;1;1" dur="1s"
                                                                 repeatCount="indefinite"
                                                                 attributeName="fill-opacity"></animate>
                                                    </circle>
                                                </g>
                                                <g transform="translate(-15 0)">
                                                    <path transform="rotate(90 50 50)" fill="#56d4da"
                                                          d="M50 50L20 50A30 30 0 0 0 80 50Z"></path>
                                                    <path fill="#56d4da" d="M50 50L20 50A30 30 0 0 0 80 50Z">
                                                        <animateTransform keyTimes="0;0.5;1"
                                                                          values="0 50 50;45 50 50;0 50 50" dur="1s"
                                                                          repeatCount="indefinite" type="rotate"
                                                                          attributeName="transform"></animateTransform>
                                                    </path>
                                                    <path fill="#56d4da" d="M50 50L20 50A30 30 0 0 1 80 50Z">
                                                        <animateTransform keyTimes="0;0.5;1"
                                                                          values="0 50 50;-45 50 50;0 50 50" dur="1s"
                                                                          repeatCount="indefinite" type="rotate"
                                                                          attributeName="transform"></animateTransform>
                                                    </path>
                                                </g>
                                            </g>
                                        </svg>
                                    </tr>
                                ) : (listSearchMovie?.length > 0 ? (
                                        <tbody
                                            className="max-lg:grid max-lg:grid-cols-2 max-lg:gap-4 min-xl:grid min-xl:grid-cols-1 min-xl:gap-4">
                                        {
                                            listSearchMovie.map((movie, index) => {
                                                return (
                                                    <tr key={index}
                                                        className="max-lg:w-3/4 max-lg:flex max-lg:flex-col min-xl:flex min-xl:flex-col">
                                                        <td className="py-2 px-5 border-b border-blue-gray-50 ">
                                                            <div className="flex items-center gap-4">
                                                                <img src={movie.avatar}
                                                                     alt=""
                                                                     className="w-9 h-9 rounded-md ml-4"/>
                                                                <p className="font-medium">{movie.nameMovie}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-5 border-b border-blue-gray-50">
                                                            {movie.kindOfFilm.map((kind, index) => (
                                                                <div key={index}
                                                                     className="relative grid items-center font-sans uppercase select-none bg-gradient-to-tr from-cyan-500 to-cyan-300 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit">
                                                                    <span>{kind.name}</span>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="py-2 px-5 border-b border-blue-gray-50">
                                                            <div
                                                                className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit">
                                                                <span>{movie.statusFilm.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-5 border-b border-blue-gray-50">
                                                            <p className="text-[14px] font-semibold">{movie.actor}</p>
                                                        </td>
                                                        <td className="py-2 px-5 border-b border-blue-gray-50">
                                                            <p className="text-[14px] font-semibold">{movie.releaseDate}</p>
                                                        </td>
                                                        <td className="py-2 px-5 border-b border-blue-gray-50">
                                                            <p className="text-[14px] font-semibold">{movie.durationMovie}</p>
                                                        </td>
                                                        <td className="box-border flex space-x-1 py-5 px-2 border-b border-blue-gray-50">
                                                            <Link to={`/update-movie/${movie.id}`}>
                                                                <button type="button" className="flex text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600
                                                          dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                         viewBox="0 0 24 24" strokeWidth={1.5}
                                                                         stroke="currentColor"
                                                                         className="size-5">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                                                                    </svg>
                                                                    <p className="flex text-center">Cập nhật</p>
                                                                </button>
                                                            </Link>
                                                            <button
                                                                onClick={(e) => handleDeletel(movie.id, movie.nameMovie)}
                                                                type="button" className="flex text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600
                                                          dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                                <svg className="h-5 text-center text-white "
                                                                     aria-hidden="true"
                                                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" stroke-linecap="round"
                                                                          stroke-linejoin="round" stroke-width="2"
                                                                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                                </svg>
                                                                <p>Xóa</p>
                                                            </button>
                                                        </td>
                                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                                            <input className="checkboxMovies" name="delete"
                                                                   value={movie.id} type="checkbox"/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    ) : (
                                        <div className="w-full mt-6 flex justify-center items-center col-span-6">
                                            <DataNotFound/>
                                        </div>
                                    )
                                )}
                            </table>
                            <div>
                                <div className="flex flex-col items-center">
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button onClick={changePrev}
                                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                            </svg>
                                            Prev
                                        </button>
                                        {
                                            numbers.map((n, i) => (
                                                <li className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                    key={i}>
                                                    <a className='page-link' href="#"
                                                       onClick={() => changeNPage(n - 1)}>{n}</a>
                                                </li>
                                            ))
                                        }
                                        <button onClick={changeNext}
                                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Next
                                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }/>
    )
}