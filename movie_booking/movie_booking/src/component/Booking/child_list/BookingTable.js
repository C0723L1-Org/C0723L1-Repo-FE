import React from 'react';
import "../../../css/booking/styles.css";
import {formatDate} from "../utils/Utils";
const BookingTable = ({bookings,handleOpenModalReceive}) => {
    return (
        <>
            <table className="tw-custom-table ">
                <thead className="tw-custom-thead">
                <tr className="tw-custom-first-tr">
                    <th scope="col" className="tw-custom-th"> Mã đặt vé</th>
                    <th scope="col" className="tw-custom-th"> Mã thành viên</th>
                    <th scope="col" className="tw-custom-th"> Tên thành viên</th>
                    <th scope="col" className="tw-custom-th"> Số CCCD</th>
                    <th scope="col" className="tw-custom-th"> Số điện thoại</th>
                    <th scope="col" className="tw-custom-th"> Phim</th>
                    <th scope="col" className="tw-custom-th"> Xuất chiếu</th>
                    <th scope="col" className="tw-custom-th"></th>
                </tr>
                </thead>
                <tbody className="tw-custom-tbody">
                {bookings.map((booking) => (
                    <tr key={booking.id} className="tw-custom-second-tr">
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Mã đặt vé</span>
                            {booking.codeBooking}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Mã thành viên</span>
                            {booking.codeUser}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Tên thành viên</span>
                            {booking.nameUser}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Số CCCD</span>
                            {booking.cardIdUser}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Số điện thoại</span>
                            {booking.phoneNumberUser}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Phim</span>
                            {booking.nameMovie}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Xuất chiếu</span>
                            {`${booking.startTime} ${formatDate(booking.showDate)}`}
                        </td>
                        <td className="tw-custom-td">
                            <div className="tw-custom-div-3">
                                <button className="bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleOpenModalReceive(booking)}>
                                    Nhận vé
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
export default BookingTable;