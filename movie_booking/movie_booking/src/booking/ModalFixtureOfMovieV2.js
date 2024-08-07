import {useState} from "react";

function ModalFixtureOfMovieV2() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDay, setselectedDay] = useState(null);
    const days = [
        { name: "Mon", date: 26 },
        { name: "Tue", date: 27 },
        { name: "Wed", date: 28 },
        { name: "Thus", date: 29 },
        { name: "Fri", date: 30 },
        { name: "Sat", date: 1 },
        { name: "Sun", date: 2 },
    ];
    const slots = [
        { startTime: "16:00", endTime: "17:20", room: "ROOM 1", bgColor: "bg-zinc-400" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 2", bgColor: "bg-white" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 3", bgColor: "bg-white" },
        { startTime: "16:00", endTime: "17:20", room: "ROOM 1", bgColor: "bg-white" },
    ];
    const handleDayClick = (index) => {
        setselectedDay(index);
    };
    const handleSlotClick = (index) => {
        setSelectedSlot(index);
    };
    return (
        <>
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-10">
                <div className="max-h-full w-full max-w-5xl overflow-y-auto sm:rounded-2xl bg-white">
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
                            <div className="flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 bg-slate-50 hover:shadow-regal-blue  hover:shadow-lg hover-light-shadow ">
                                <div className="flex items-center px-4 py-4">
                                    <div className="text-center">
                                        <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                            Previous
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                {days.map((day, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDayClick(index)}
                                        className={`flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 ${
                                            selectedDay === index ? 'bg-zinc-400' : ''
                                        } hover:shadow-regal-blue hover:shadow-lg hover-light-shadow`}
                                    >
                                        <div className="flex items-center px-4 py-4">
                                            <div className="text-center">
                                                <p className="text-gray-900 group-hover:text-black text-sm transition-all duration-300">
                                                    {day.name}
                                                </p>
                                                <p className="text-gray-900 group-hover:text-black mt-3 group-hover:font-bold transition-all duration-300">
                                                    {day.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex group rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 bg-slate-50 hover:shadow-regal-blue  hover:shadow-lg hover-light-shadow ">
                                <div className="flex items-center px-4 py-4">
                                    <div className="text-center">
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
                                                slots.map((slot,index)=>(
                                                    <>
                                                        <div key={index}
                                                             onClick={() => handleSlotClick(index)}
                                                            className={`w-[140px] h-[80px] shadow-xl border-2 border-regal-blue rounded-2xl flex flex-col justify-center items-center
                                                                         gap-2 cursor-pointer pb-4 hover:shadow-regal-blue hover:shadow-lg hover-light-shadow ${
                                                                selectedSlot === index ? 'bg-zinc-400' : 'bg-white'
                                                            }`}>
                                                            <div className="flex flex-row items-center justify-center gap-2">
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
                                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
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

export default ModalFixtureOfMovieV2;