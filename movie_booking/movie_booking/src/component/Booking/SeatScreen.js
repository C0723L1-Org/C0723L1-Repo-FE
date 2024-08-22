import './seat.css';
import request from "../../redux/axios-config"
import {useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {removeAllSelectedSeat, removeSeat, setSeat} from "../../redux/action/seat-action";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {setListBooking} from "../../redux/action/booking-action";
import {Main} from "../../layout/main/Main";
import {saveBookingToBackend} from "./Receipt";
import BtnLoader from "./BtnLoader";

function SeatScreen(){
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate();
    const listSeat = useSelector(state => state.seat);
    const showtime = useSelector(state => state.showtime)
    const user = useSelector(state => state.user.user)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F','G','H'];
    const seatsPerRow = 12;
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectingSeats, setSelectingSeats] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const bookingStatus ={
        id:"1",
        name:"Chưa thanh toán"
    }
    useEffect(() => {
        document.title = `Movie: ${showtime?.movie?.nameMovie || 'Tên Phim'}` ;
        window.scrollTo(0, 0);
        dispatch(removeAllSelectedSeat())
        const fetchDateSeatSelected = async () =>{
            console.log(showtime)
            try {
                let res = await request.get("/seat/public/selected",{
                    params:{
                        showtimeId : showtime?.id || 0
                    }
                })
                console.log(res.data)
                setSelectedSeats(prevState => res.data)
            } catch (e) {
                console.log(e)
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
        const fetchDateSeatSelecting = async () =>{
            try {
                let res = await request.get("/seat/public/selecting",{
                    params:{
                        showtimeId : showtime?.id || 0
                    }
                })
                setSelectingSeats(prevState => res.data)
            } catch (e) {
                console.log(e)
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
        fetchDateSeatSelected()
        fetchDateSeatSelecting()
    }, []);
    const isSeatSelected = (seatNumber) => {
return listSeat.some(seat => seat.seatNumber === seatNumber);
    };
    const isSeatOccupied = (seatNumber) => {
        const newArray = [...selectedSeats];
        return newArray.some(seat => seat.seatNumber === seatNumber);
    };
    const isSelectingByOther =(seatNumber) =>{
        const newArray = [...selectingSeats];
        return newArray.some(seat => seat.seatNumber === seatNumber);
    }

    const handleSeatClick = (seatNumber) => {
        if(!(showtime)){
            Swal.fire({
                title: "Warning!!!",
                text:"Vui lòng chọn xuất chiếu trước khi chọn ghế ngồi",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/movie/${params.id}`)
                }
            })
        }
        else{
            if (listSeat.some(s => s.seatNumber === seatNumber)) {
                dispatch(removeSeat(showtime.room.id,seatNumber));
            } else {
                dispatch(setSeat(showtime.room.id,seatNumber));
            }
        }

        console.log(listSeat)
    };
    const creatListBooking =() =>{
        const dateBooking = formatDateToDDMMYYYY(new Date())
        return listSeat.map(seat => ({
            dateBooking: dateBooking,
            totalAmount: seat.price,
            user: null,
            showTime: showtime,
            seat: seat,
            bookingStatus: bookingStatus
        }));
    }
    const formatDateToDDMMYYYY =(date) =>{
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const saveBookingToBackend = async (booking, userId) => {
        try {
            await request.post(`/booking/create/${userId}`,booking)
        } catch (e){
            console.log(e)
        }
    };
    function handelClickMoveReceipt() {
        Swal.fire({
            title: "Warning!!!",
            text:"Vui lòng kiễm tra kỹ trước khi chuyển sang bước tiếp theo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(prevState => true)
                const listBooking = creatListBooking()
                for (const item of listBooking) {
                    try {
                        console.log(item)
                        await saveBookingToBackend(item,user.id);
                    } catch (error) {
                        console.error('Error saving booking:', error);
                    }
                }
                await dispatch(setListBooking(listBooking))
                setIsLoading(prevState => false)
                navigate(`/receipt/${params.id}`)
            }
        });

    }
    function handelClickBackToMovie() {
        Swal.fire({
            title: "Warning!!!",
            text:"Bạn có muốn chọn lại xuất chiếu ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(removeAllSelectedSeat())
                navigate(`/movie/${params.id}`)
            }
        });

    }
    return (
        <Main content={
            <div className="my-6 sm:my-10 md:my-16 lg:my-25">
               <div className="flex flex-col justify-center items-center bg-slate-100 ">
                   <div className="seat-screen_body w-full max-w-[900px] rounded-lg bg-slate-600">
                       <div className="movie-container mt-5 sm:mt-10 md:mt-15 lg:mt-20">
                           <p>
                               <label>Movie: </label>
                               <span id="movie"> {showtime?.movie?.nameMovie || 'Tên Phim'}</span>
                           </p>
                           <p>
                               <label>Thời lượng: </label>
                               <span id="movie"> {showtime?.movie?.durationMovie || "Thời Lượng"} phút</span>
                           </p>
                       </div>
                       <ul className="showcase flex flex-wrap justify-around">
                           <li className="m-2">
                               <div className="seat"></div>
                               <small className="text-white">Hợp lệ</small>
                           </li>
                           <li className="m-2">
                               <div className="seat selected"></div>
                               <small className="text-white">Đang chọn</small>
                           </li>
                           <li className="m-2">
                               <div className="seat occupied"></div>
                               <small className="text-white">Đã đặt</small>
                           </li>
                           <li className="m-2">
                               <div className="seat other-selecting"></div>
                               <small className="text-white"> Giữ vé</small>
                           </li>
                       </ul>
                       {/*in ra danh sách ghế*/}
                       <div className="seat-container px-2 sm:px-4 md:px-8">
                           <div className="screen"></div>
                           {rows.map((row) => (
                               <div className="row flex justify-center" key={row}>
                                   {Array.from({ length: seatsPerRow }, (_, index) => {
                                       const seatNumber = `${row}${index + 1}`;
                                       return (
                                           <div
                                               className={`seat 
                                               ${isSeatOccupied(seatNumber) ? 'occupied pointer-events-none cursor-not-allowed' : ''} 
                                               ${isSeatSelected(seatNumber) ? 'selected' : ''}
                                               ${isSelectingByOther(seatNumber) ? 'other-selecting cursor-not-allowed, pointer-events-none' : ''}`

                                           }
                                               key={seatNumber}
                                               onClick={() => handleSeatClick(seatNumber)}
                                           >
                                               {seatNumber}
                                           </div>
                                       );
                                   })}
                               </div>
                           ))}
                           <p className="text mt-4 sm:mt-6 md:mt-8">
                               Bạn đã chọn <span id="count">{listSeat.length}</span> ghế
                           </p>
                           <p className="text  mt-2 sm:mt-4 md:mt-6">
                               Tổng tiền: <span id="count">{listSeat.reduce((total, seat) => {
                               return total + seat.price;
                           }, 0)}</span> VNĐ
                           </p>
                           <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-5">
                               <div className="w-full flex justify-center items-center mb-4 sm:mb-0">
                                   <button onClick={() => handelClickBackToMovie()}
                                            className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                                       Quay lại
                                   </button>
                               </div>
                               <div className="w-full flex justify-center items-center">
                                   <button onClick={() =>handelClickMoveReceipt()}
                                            className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                                       {isLoading ? <BtnLoader/>:"Đặt vé"}
                                   </button>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        }/>
    )
}
export default SeatScreen;