import './receipt.css'
function Receipt(){
    const data = [
        {
            title: "Siêu sao âm nhạc",
            email: "jobs@sailboatui.com",
            seat: "A1",
            room: "Room : 3",
            time: "9:00 - 11:00",
            date: "26-2-2024",
            price: "100000 VND"
        },
        {
            title: "Siêu sao âm nhạc",
            email: "jobs@sailboatui.com",
            seat: "A1",
            room: "Room : 3",
            time: "9:00 - 11:00",
            date: "26-2-2024",
            price: "100000 VND"
        },
        {
            title: "Siêu sao âm nhạc",
            email: "jobs@sailboatui.com",
            seat: "A1",
            room: "Room : 3",
            time: "9:00 - 11:00",
            date: "26-2-2024",
            price: "100000 VND"
        }
    ];
    return (
        <>
            <div className="py-14  md:px-6 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-3xl mt-10">
                <div className="w-full flex items-center ml-2">
                    <button className=" hover:bg-slate-200 text-amber-700 font-semibold hover:text-black py-2 px-4 border border-amber-700 hover:border-transparent rounded ">
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
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Movie Name</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Seat</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Theater</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Time</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Date</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    {data.map((item, index) => (
                                        <tr className="hover:bg-gray-50" key={index}>
                                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-700">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-gray-400">{item.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-base font-normal text-green-600">
                                                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    {item.seat}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{item.room}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                                    {item.time}
                                                  </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{item.date}</td>
                                            <td className="px-6 py-4">{item.price}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-4">
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
                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Tổng cộng
                        </p>
                        <div className="flex justify-center items-center w-full bg-orange-100 rounded">
                            <div className="total-money">
                                200000 VNĐ
                            </div>
                        </div>
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Phương thức:
                        </p>
                        <ul>
                            <li>
                                <div className="flex">
                                    <input type="radio" name="payment-method"/>
                                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 shadow-md m-1">
                                            <img
                                                className="w-full h-full"
                                                alt="logo"
                                                src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg"
                                            />
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            PayPal
                                        </div>
                                </div>

                            </li>
                            <li>
                                <div className="flex">
                                    <input type="radio" name="payment-method"/>
                                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 shadow-md m-1">
                                            <img
                                                className="w-full h-full"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/momo_icon.png"
                                            />
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            MOMO
                                        </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <input type="radio" name="payment-method"/>
                                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 shadow-md m-1">
                                            <img
                                                className="w-full h-full"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/icon-HOT-96x96.png"
                                            />
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            Zalopay
                                        </div>
                                </div>

                            </li>
                            <li>
                                <div className="flex">
                                    <input type="radio" name="payment-method"/>
                                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 shadow-md m-1">
                                            <img
                                                className="w-full h-full"
                                                alt="logo"
                                                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/placeholder/default/vnpay_newlogo.png"
                                            />
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            VNPAY
                                        </div>
                                </div>
                            </li>
                        </ul>
                        <div className="w-full flex justify-center items-center">
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
                                Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Receipt;