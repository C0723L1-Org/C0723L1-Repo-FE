import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function UserBookingManagement() {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/private/booking-customer"
        );
        setBookingData(response.data);
      } catch (error) {
        setError("Đã xảy ra lỗi khi lấy dữ liệu.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[1170px] min-h-[calc(-69px+100vh)] mx-auto px-4 py-6">
      <div className="flex flex-row gap-[48px] justify-start items-start">
        <Sidebar />
        <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-5xl sm:rounded-lg">
              <h1 className="pl-6 font-bold sm:text-3xl">Vé đã đặt</h1>
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên phim
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày đặt
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tổng tiền
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookingData.map((booking, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.nameMovie}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(booking.dateBooking).toLocaleString(
                              "vi-VN"
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {booking.totalAmount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.bookingStatus === "Đã thanh toán"
                                ? "bg-green-100 text-green-800"
                                : booking.bookingStatus === "Chưa thanh toán"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookingManagement;
