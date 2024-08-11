import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Bounce, toast} from "react-toastify";
import request from "../../redux/axios-config";

function ModalFixtureOfMovie() {
    const params = useParams()
    const [movie, setMovie] = useState({})
    const [selectedSlot, setSelectedSlot] = useState(null);
    // Lấy ngày hiện tại
    const initialDate = new Date();
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [days, setDays] = useState([])
    const daysOfWeek  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'];
    const [showtimes, setShowtimes] = useState([])
    const [selectedShowtime, setSelectedShowtime] = useState({})
    useEffect(() => {
        const dates = [];
        for (let i = -3; i <= 3; i++) {
            // Tạo một bản sao của currentDate và thay đổi nó
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + i);
            dates.push(newDate);
        }
        setDays(days => dates)
    }, [currentDate]);
    useEffect( () => {
        const fetchDataMovie =async()=>{
            try {
                const res = await request.get(`/movie/public/${params.id}`)
                await setMovie(prevState => res.data)
            } catch (e) {
                toast.error(`Error: ${e}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }

        fetchDataMovie()
    }, []);
    useEffect(() => {
        const fetchDataShowtime = async () =>{
            const timePart = currentDate.toTimeString().split(' ')[0]
            const year = currentDate.getFullYear(); // Lấy năm
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`
            console.log("Ngày:", formattedDate);
            console.log("Time:", timePart);
            try {
                const  res = await request.get(`/showtime/public/list`,{
                    params:{
                        movieId:params.id,
                        date:formattedDate,
                        time:timePart
                    }
                })
                await setShowtimes(prevState => res.data)

            } catch (e) {
                toast.error(`Error: ${e}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
        fetchDataShowtime()
    }, [currentDate]);
    const handleDayClick = (day) => {
        setCurrentDate(currentDate=>day)
        console.log(currentDate)
    };
    const handleClickDateButton = (param) => {
        const newDate = new Date(currentDate);
        switch (param) {
            case "NEXT":
                newDate.setDate(currentDate.getDate() + 1);
                setCurrentDate(newDate);
                break;
            case "PREVIOUS":
                newDate.setDate(currentDate.getDate() - 1);
                setCurrentDate(newDate);
                break;
        }
        setCurrentDate(currentDate =>newDate);
        console.log("cur: " +currentDate)

    }

    const handleSlotClick = (index) => {
        setSelectedSlot(index);
        setSelectedShowtime(prevState => showtimes[index])
    };
    return (
        <>
            {/*<div className="fixed      bg-opacity-50 ">*/}
            <div className="flex items-center justify-center left-0 top-0 h-full w-full py-10 z-10 bg-slate-100">
                <div className="max-h-full w-full max-w-5xl overflow-y-auto sm:rounded-2xl bg-white ">
                    <div className="w-full ">
                    </div>
                    <div className="cursor-pointer flex justify-end items-center">
                    </div>
                    <div className="m-1 my-2 mx-auto p-1">
                        {/*lịch chiếu film*/}
                        <div className="mb-8">
                            <h1 className="mb-4 text-3xl font-semibold">
                                Lịch chiếu phim
                            </h1>
                            <span className="flex items-center">
                                <span className="h-px flex-1 bg-black"></span>
                            </span>
                        </div>
                    </div>
                    <div className="h-[200px] bg-white p-6">
                        <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg  mx-auto py-4 px-2 md:mx-12">
                            {}
                            <div className="flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 bg-slate-50 hover:shadow-regal-blue  hover:shadow-lg hover-light-shadow ">
                                <div className="flex items-center px-4 py-4">
                                    <div
                                        onClick={currentDate.getTime() >= today.getTime() ? () => handleClickDateButton("PREVIOUS") : null}
                                        className={`text-center ${currentDate.getTime() < today.getTime() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                            Previous
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                {days.map((day, index) => {
                                    const tempCurrentDate = new Date(currentDate);
                                    const tempToday = new Date(today);
                                    const tempDay = new Date(day)
                                    tempCurrentDate.setHours(0, 0, 0, 0);
                                    tempDay.setHours(0, 0, 0, 0);
                                    tempToday.setHours(0, 0, 0, 0);
                                    const isPast = tempDay.getTime() < tempToday.getTime();
                                    return (
                                        <>
                                        <div
                                                key={index}
                                                onClick={() => handleDayClick(day)}
                                                style={isPast ? { pointerEvents: 'none' } : {}}
                                                className={`flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${
                                                    tempCurrentDate.getTime() === tempDay.getTime() ? 'bg-zinc-400' : ''
                                                } ${isPast ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-regal-blue hover:shadow-lg hover-light-shadow'}`}
                                            >
                                                <div className="flex items-center px-4 py-4">
                                                    <div className="text-center">
                                                        <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                                            {daysOfWeek[day.getDay()]}
                                                        </p>
                                                        <p className="text-gray-900 group-hover:text-black mt-3 group-hover:font-bold transition-all duration-300">
                                                            {day.getDate()}/{day.getMonth() + 1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                            <div
                                className="flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 bg-slate-50 hover:shadow-regal-blue  hover:shadow-lg hover-light-shadow ">
                                <div className="flex items-center px-4 py-4">
                                    <div onClick={() => handleClickDateButton("NEXT")}
                                         className="text-center">
                                        <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                            Next
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*thông tin film , thông tin vé*/}
                    <div className="flex flex-row items-start justify-start gap-20 mx-auto py-4 px-6 md:mx-12">
                        <div className="w-[300px] min-h-[450px]">
                            <img
                                className="max-w-[300px] rounded-lg object-cover"
                                src={movie.avatar}
                                alt="Baner"
                            />
                        </div>
                        <div className="flex flex-col h-[350px]">
                            {
                                showtimes.length === 0 ? (
                                    <span className="text-xl">
                                          Không có lịch chiếu trong khoảng thời gian này
                                        </span>
                                ) : (
                                    <div className=" min-w-[400px] max-h-[400px]  grid grid-cols-3  gap-3  ">
                                        {
                                            showtimes.map((s, index) => (
                                                <>
                                                    <div key={index}
                                                         onClick={() => handleSlotClick(index)}
                                                         className={`w-[140px] h-[80px] shadow-xl border-2 border-regal-blue rounded-2xl flex flex-col justify-center items-center
                                                                         gap-2 cursor-pointer pb-4 hover:shadow-regal-blue hover:shadow-lg hover-light-shadow ${
                                                             selectedSlot === index ? 'bg-zinc-400' : 'bg-white'
                                                         }`}>
                                                        <div
                                                            className="flex flex-row items-center justify-center gap-2">
                                                            <div className="flex flex-row items-center justify-center">
                                                                <span>{s.startTime}</span>
                                                            </div>
                                                            <span>-</span>
                                                            <div className="flex items-center justify-center">
                                                                <span>{s.startTime + s.movie.durationMovie}</span>
                                                            </div>
                                                        </div>
                                                        <span className="flex items-center">
                                                              <span className="h-px flex-1 bg-black">
                                                                {s.room.name}
                                                              </span>
                                                            </span>
                                                    </div>
                                                </>)
                                            )
                                        }
                                    </div>
                                )
                            }
                            {/*bước kế tiếp*/}
                            <div>
                                <div className="w-full  h-[250px] flex flex-col-reverse justify-items-end items-center">
                                    <button
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
                                        Tiếp theo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalFixtureOfMovie;