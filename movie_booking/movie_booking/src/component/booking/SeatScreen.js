import './seat.css';
import request from "../../redux/axios-config"
import {useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {removeSeat, setSeat} from "../../redux/action/seat-action";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {setListBooking} from "../../redux/action/booking-action";

function SeatScreen(){
    const dispatch = useDispatch();
    const param = useParams()
    const navigate = useNavigate();
    const listSeat = useSelector(state => state.seat);
    const showtime = useSelector(state => state.showtime)
    const user = useSelector(state => state.user)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F','G','H'];
    const seatsPerRow = 12;
    const [occupiedSeats, setOccupiedSeats] = useState([])
    useEffect(() => {
        const fetchDateSeatSelected = async () =>{
            // console.log(showtime)
            try {
                let res = await request.get("/seat/public/list",{
                    params:{
                        showtimeId : showtime.id
                    }
                })
                console.log(res.data)
                setOccupiedSeats(prevState => res.data)
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
        fetchDateSeatSelected()

    }, []);
    const isSeatSelected = (seatNumber) => {
return listSeat.some(seat => seat.seatNumber === seatNumber);
    };
    const isSeatOccupied = (seatNumber) => {
        const newArray = [...occupiedSeats];
        return newArray.some(seat => seat.seatNumber === seatNumber);
    };

    const handleSeatClick = (seatNumber) => {
        if(!(showtime)){
            Swal.fire({
                title: "Warning!!!",
                text:"Please choose showtime before choose seat",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok!"
            }).then(
                navigate(`/movie/${param.id}`)
            )}else{
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
            user: user,
            showTime: showtime,
            seat: seat
        }));
    }
    const formatDateToDDMMYYYY =(date) =>{
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    function handelClickMoveReceipt() {
        console.log(listSeat);
        console.log(showtime)
        Swal.fire({
            title: "Warning!!!",
            text:"Please check carefully before next step",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const listBooking = creatListBooking()
                await dispatch(setListBooking(listBooking))
                navigate("/receipt")
            }
        });

    }
    function handelClickBackToMovie() {
        Swal.fire({
            title: "Warning!!!",
            text:"Ary you sure get back to select showtime",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/movie/${showtime.movie.id}`)
            }
        });

    }
    return (
       <><div className="flex justify-center align-center rounded-lg">
           <div className="seat-screen_body w-1/2">
               <div className="movie-container">
                   <label>Movie: </label>
                   <span id="movie"> Siêu sao ca nhạc</span>
               </div>
               <ul className="showcase">
                   <li>
                       <div className="seat"></div>
                       <small>Available</small>
                   </li>
                   <li>
                       <div className="seat selected"></div>
                       <small>Selected</small>
                   </li>
                   <li>
                       <div className="seat occupied"></div>
                       <small>Occupied</small>
                   </li>
               </ul>
                {/*in ra danh sách ghế*/}
               <div className="seat-container ">
                   <div className="screen"></div>
                   {rows.map((row) => (
                       <div className="row" key={row}>
                           {Array.from({ length: seatsPerRow }, (_, index) => {
                               const seatNumber = `${row}${index + 1}`;
                               return (
                                   <div
                                       className={`seat ${isSeatOccupied(seatNumber) ? 'occupied' : ''} ${isSeatSelected(seatNumber) ? 'selected' : ''}`}
                                       key={seatNumber}
                                       onClick={() => handleSeatClick(seatNumber)}
                                   >
                                       {seatNumber}
                                   </div>
                               );
                           })}
                       </div>
                   ))}
                   <p className="text">
                       Bạn đã chọn <span id="count">{listSeat.length}</span> ghế
                   </p>
                   <div className="flex justify-between items-center w-full mt-5">
                       <div className="w-full  flex justify-center items-center">
                           <button onClick={() => handelClickBackToMovie()}
                                    className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                               Quay lại
                           </button>
                       </div>
                       <div className="w-full flex justify-center items-center">
                           <button onClick={() =>handelClickMoveReceipt()}
                                    className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                               Tiếp theo
                           </button>
                       </div>
                   </div>
               </div>
           </div>
           </div>
       </>
    )
}
export default SeatScreen;