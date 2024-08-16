import './receipt.css'
import {useEffect, useState} from "react";
import {PayPalButtons} from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";
import request from "../../redux/axios-config";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {setListBooking} from "../../redux/action/booking-action";
import {Main} from "../../layout/main/Main";
function Receipt(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const listBooking = useSelector(state => state.booking)
    // const userId = useSelector(state => state.user)
    const userId = 1
    const totalAmount = listBooking.reduce((total, booking) => {
        return total + booking.seat.price;
    }, 0);
    const [paymentSelector, setPaymentSelector] = useState()
    const [amountVND, setAmountVND] = useState(totalAmount)
    const [amountUSD, setAmountUSD] = useState(0)
    const bookingStatus ={
        id:"1",
        name:"Đã thanh toán"
    }

    const handlePaymentChange = (value) =>{
        setPaymentSelector(value);
    }
    const onCreateOrder = async (data,actions) => {
        console.log(amountUSD)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amountUSD.toFixed(2),
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            updateBookings().then(()=>(
                Swal.fire({
                    icon: "success",
                    title: "đặt vé thành công",
                    text: "Vui lòng kiểm tra email để xem lại thông tin vé",
                    showConfirmButton: true,
                }).then((result) =>{
                        if (result.isConfirmed){
                            navigate("/")
                        }
                    }
                ))
            )
        })
    }
    const onErrorOrder = (err) =>{
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Thanh toán không thành công! lỗi :" +err
        });
    }
    const updateBookings = async () => {
        for (const item of listBooking) {
            let newItem = {
                ...item,
                bookingStatus: bookingStatus
            };
            try {
                console.log(newItem)
                await saveBookingToBackend(newItem);
            } catch (error) {
                console.error('Error saving booking:', error);
            }
        }
    };
    const saveBookingToBackend = async (booking) => {
        try {
            console.log(booking)
            await request.post(`/booking/create/${userId}`,booking)
        } catch (e){
            console.log(e)
        }
    };
    useEffect(() => {
        console.log(userId)
        document.title = `Movie: ${listBooking[1]?.showTime?.movie?.nameMovie || 'Tên Phim'}` ;
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/c6e9382a6961e5a03e3ee78e/latest/VND');
                setAmountUSD(prevState => amountVND*response.data.conversion_rates.USD)
            } catch (error) {
                console.error('Error fetching exchange rate', error);
            }
        };

        fetchExchangeRate();
    }, []);
    function handelClickBackSeatScreen() {
        Swal.fire({
            title: "Warning!!!",
            text:"Bạn muốn chọn lại ghế",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/seat/${params.id}`)
            }
        });

    }
    const convertTime = (time) =>{
        return time.substring(0, 5);
    }
    // const convertEndTime = (time, durationMovie) =>{
    //     const date = new Date(time);
    //     date.setMinutes(date.getMinutes() + durationMovie);
    //     const newIsoString = date.toISOString();
    //     return convertTime(newIsoString)
    // }
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const removeBooking=(index)=>{
        const newListBooking =  listBooking.filter((item, i) => index !== i)
       dispatch(setListBooking(newListBooking))
    }
    return (
        <Main content={
        <>
            <div className="py-14  md:px-6 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-3xl mt-10">
                <div className="w-full flex items-center ml-2">
                    <button onClick={() =>handelClickBackSeatScreen()}
                            className=" hover:bg-slate-200 text-amber-700 font-semibold hover:text-black py-2 px-4 border border-amber-700 hover:border-transparent rounded ">
                        Quay lại
                    </button>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-3xl">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                Booking Information
                            </p>
                            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Movie Name</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Seat</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Theater</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Time</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Date</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900">Price</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-lg text-gray-900"></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    {listBooking.map((item, index) => (
                                        <tr className="hover:bg-gray-50" key={index}>
                                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-700">
                                                        {item.showTime.movie.nameMovie}
                                                    </div>
                                                    <div className="text-gray-400">{item.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-base font-normal text-green-600">
                                                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    {item.seat.seatNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{item.seat.room.roomName}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                                    {convertTime(item.showTime.startTime)}
                                                  </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{formatDate(item.showTime.showDate)}</td>
                                            <td className="px-6 py-4">{item.totalAmount} VNĐ</td>
                                            <td className="px-6 py-4">
                                                <div onClick={() =>removeBooking(index)}
                                                     className="flex justify-end gap-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 w-full xl:w-96 flex flex-col justify-between items-center p-6 shadow-lg rounded-lg">
                        <p className="text-xl font-semibold text-gray-900 mb-4">
                            Tổng cộng
                        </p>
                        <div className="flex justify-center items-center w-full bg-orange-100 rounded p-2 mb-4">
                            <div className="total-money text-2xl font-bold text-orange-600">
                                {totalAmount} VNĐ
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mb-4">
                            Phương thức:
                        </p>
                        <ul className="space-y-3 w-full">
                            <li className="flex items-center space-x-3">
                                    <input type="radio"
                                           value="PAYPAL"
                                           id="PAYPAL"
                                           name="payment-method"
                                           onChange={(event) =>handlePaymentChange(event.target.value)}/>
                                    <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                                            <img
                                                className="w-full h-full object-contain"
                                                alt="logo"
                                                src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg"
                                            />
                                    </div>
                                        <label className="text-gray-800" for="PAYPAL">PayPal</label>

                            </li>
                            <li className="flex items-center space-x-3">
                                    <input type="radio"
                                           value="MOMO"
                                           id="MOMO"
                                           name="payment-method"
                                           onChange={(event) =>handlePaymentChange(event.target.value)}/>
                                    <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                                            <img
                                                className="w-full h-full object-contain"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/momo_icon.png"
                                            />
                                    </div>
                                    <label className="text-gray-800" for="MOMO">MOMO</label>
                            </li>
                            <li className="flex items-center space-x-3">
                                    <input type="radio"
                                           value="ZALOPAY"
                                           id="ZALOPAY"
                                           name="payment-method"
                                           onChange={(event) =>handlePaymentChange(event.target.value)}/>
                                    <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                                            <img
                                                className="w-full h-full object-contain"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/icon-HOT-96x96.png"
                                            />
                                    </div>
                                    <label className="text-gray-800" for="ZALOPAY">Zalopay</label>

                            </li>
                            <li className="flex items-center space-x-3">
                                    <input type="radio"
                                           value="VNPAY"
                                           id="VNPAY"
                                           name="payment-method"
                                           onChange={(event) =>handlePaymentChange(event.target.value)}
                                    />
                                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                                            <img
                                                className="w-full h-full object-contain"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/vnpay_newlogo.png"
                                            />
                                        </div>
                                    <label className="text-gray-800" for="VNPAY">VNPAY</label>
                            </li>
                        </ul>
                        {
                            paymentSelector === "PAYPAL" ? (
                                <div className="w-full flex justify-center items-center mt-6">
                                        <PayPalButtons
                                            style={{ layout: "vertical" }}
                                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                                            onError={(err) =>onErrorOrder(err)}
                                            fundingSource={"paypal"}
                                        />
                                </div>
                            ):(<div className="w-full flex justify-center items-center mt-6">
                                <button onClick={()=>{console.log(paymentSelector)}}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
                                    Thanh Toán
                                </button>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </>
        }/>
    );
}
export default Receipt;