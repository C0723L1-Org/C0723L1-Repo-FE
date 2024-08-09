import {useEffect, useState} from "react";

function ModalFixtureOfMovie() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    // Lấy ngày hiện tại
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [days, setDays] = useState([])
    const daysOfWeek  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'];
    const slots = [
        { startTime: "16:00", endTime: "17:20", room: "ROOM 1", bgColor: "bg-zinc-400" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 2", bgColor: "bg-white" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 3", bgColor: "bg-white" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 1", bgColor: "bg-white" },
    ];
    useEffect(() => {
        const dates = [];
        for (let i = -3; i <= 3; i++) {
            // Tạo một bản sao của currentDate và thay đổi nó
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + i);
            newDate.setHours(0, 0, 0, 0);
            dates.push(newDate);
        }
        setDays(days => dates)


    }, [currentDate]);
    const handleDayClick = (day) => {
        console.log("current: "+currentDate)
        console.log("index: "+day)
        setCurrentDate(currentDate=>day)
        console.log(currentDate.getTime() === day.getTime())
    };
    const handleClickDatePicker = (param) => {
        const newDate = new Date(currentDate);
        newDate.setHours(0, 0, 0, 0);

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
    }

    const handleSlotClick = (index) => {
        setSelectedSlot(index);
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
                        <div
                            className="flex bg-white shadow-md justify-start md:justify-center rounded-lg  mx-auto py-4 px-2 md:mx-12">
                            <div
                                className="flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 bg-slate-50 hover:shadow-regal-blue  hover:shadow-lg hover-light-shadow ">
                                <div className="flex items-center px-4 py-4">
                                    <div onClick={currentDate.getTime() !== today.getTime() ? () => handleClickDatePicker("PREVIOUS") : null}
                                         className={`text-center ${currentDate.getTime() === today.getTime() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                            Previous
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                {days.map((day, index) => {
                                    const isPast = day.getTime() < today.getTime();
                                    return (
                                        <>
                                            <div
                                                key={index}
                                                onClick={() => handleDayClick(day)}
                                                style={isPast ? { pointerEvents: 'none' } : {}}
                                                className={`flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${
                                                    currentDate.getTime() === day.getTime() ? 'bg-zinc-400' : ''
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
                                    <div onClick={() => handleClickDatePicker("NEXT")}
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
                                src="https://i.pinimg.com/736x/6e/fc/de/6efcde07c6aab04e7ef2daa00df27b5f.jpg"
                                alt="Baner"
                            />
                        </div>
                        <div className="flex flex-col h-[350px]">
                            {
                                slots.length === 0 ? (
                                    <span className="text-xl">
                                          Không có lịch chiếu trong khoảng thời gian này
                                        </span>
                                ) : (
                                    <div className=" min-w-[400px] max-h-[400px]  grid grid-cols-3  gap-3  ">
                                        {
                                            slots.map((slot, index) => (
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
                                                                <span>16:00</span>
                                                            </div>
                                                            <span>-</span>
                                                            <div className="flex items-center justify-center">
                                                                <span>17:20</span>
                                                            </div>
                                                        </div>
                                                        <span className="flex items-center">
                                                              <span className="h-px flex-1 bg-black">
                                                                ROOM 1
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