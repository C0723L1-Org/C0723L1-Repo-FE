import React, {useState, useEffect} from 'react';
import {fetchBookings} from "../../service/BookingService";
import BookingTable from "./child_list/BookingTable";
import HeaderBooking from "./child_list/HeaderBooking";
import Pagination from "../Booking/child_list/Pagination";
import SearchNotFound from "../Booking/child_list/SearchNotFound";
import ReceiveBookingModal from "./child_list/ReceiveBookingModal";
import { ClipLoader } from 'react-spinners';
import {SidebarCollection} from "./child_list/SidebarCollection";

const ListBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [bookingReceive, setBookingReceive] = useState(null);
    const [valueSearch, setValueSearch] = useState({valueSearch: ''});
    const [isLoading, setIsLoading] = useState(false); // Biến trạng thái loading
    //Cập nhật hiển thị cho vé sau khi nhận thành công
    const handleBookingReceived = (bookingId) => {
        const newBookings = bookings.filter(booking => booking.id !== bookingId);
        setBookings(newBookings);
        fetchData(currentPage, valueSearch); // Cập nhật lại danh sách nhân viên
    };

    // Lấy dữ liệu
    // const fetchData = async (page, valueSearch) => {
    //     const data = await fetchBookings(page, valueSearch);
    //     setBookings(data.content || []);
    //     setTotalPages(data.totalPages);
    // };
    const fetchData = async (page, valueSearch) => {
        setIsLoading(true); // Bắt đầu trạng thái loading
        const data = await fetchBookings(page, valueSearch);
        setTimeout(() => {
            setBookings(data.content || []);
            setTotalPages(data.totalPages);
            setIsLoading(false); // Kết thúc trạng thái loading sau 2 giây
        }, 300); // Thời gian chờ 2 giây
    };

    const handleOpenModalReceive = (booking) => setBookingReceive(booking);
    const handleCloseModalReceive = () => setBookingReceive(null);

    // Tìm kiếm
    const handleSearch = (valueSearch) => {
        setValueSearch({valueSearch: valueSearch});
        // console.log(valueSearch);
        setCurrentPage(0);
        // fetchData(0, valueSearch);
    };

    // Xử lý Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // fetchData(page, valueSearch);
        // Thực hiện hành động khác khi trang thay đổi, như tải lại dữ liệu
    };
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        fetchData(currentPage, valueSearch);
    }, [currentPage,valueSearch]);


    return (
        <>
            {/*<div className="tw-custom-header-table-zone sticky top-0 z-50">*/}
            {/*    /!* Header *!/*/}
            {/*    <HeaderBooking onSearch={handleSearch}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {isLoading ? (*/}
            {/*        <div className="flex justify-center items-center h-full">*/}
            {/*            <ClipLoader color="#123abc" loading={isLoading} size={40}/> /!* Vòng tròn loading *!/*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            {bookings.length > 0 ? (*/}
            {/*                <div className="tw-table-zone">*/}
            {/*                    /!* Table *!/*/}
            {/*                    <BookingTable*/}
            {/*                        bookings={bookings}*/}
            {/*                        handleOpenModalReceive={handleOpenModalReceive}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            ) : (*/}
            {/*                <div className="mx-16 h-10">*/}
            {/*                    <SearchNotFound onFetchData={() => {*/}
            {/*                        setValueSearch({valueSearch: ''});*/}
            {/*                    }}/>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*{!isLoading && (*/}
            {/*    <Pagination*/}
            {/*        currentPage={currentPage}*/}
            {/*        totalPages={totalPages}*/}
            {/*        onPageChange={handlePageChange}*/}
            {/*        onPreviousPage={handlePreviousPage}*/}
            {/*        onNextPage={handleNextPage}*/}
            {/*    />*/}
            {/*)}*/}

            {/*{bookingReceive && (*/}
            {/*    <ReceiveBookingModal*/}
            {/*        booking={bookingReceive}*/}
            {/*        isOpen={!!bookingReceive}*/}
            {/*        onClose={handleCloseModalReceive}*/}
            {/*        onBookingReceived={handleBookingReceived}*/}
            {/*    />*/}
            {/*)}*/}
            <div className="grid grid-cols-1 xl:grid-cols-12">
                {/* Sidebar */}
                <div className="col-span-2 hidden xl:block sticky top-0 h-screen">
                    <SidebarCollection/>
                </div>

                {/* Nội dung chính */}
                <div className="col-span-10 w-full">
                    <div className="tw-custom-header-table-zone sticky top-0 z-50 bg-white">
                        <HeaderBooking onSearch={handleSearch}/>
                    </div>

                    <div className="mt-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <ClipLoader color="#123abc" loading={isLoading} size={40}/> {/* Vòng tròn loading */}
                            </div>
                        ) : (
                            <>
                                {bookings.length > 0 ? (
                                    <div className="tw-table-zone">
                                        <BookingTable
                                            bookings={bookings}
                                            handleOpenModalReceive={handleOpenModalReceive}
                                        />
                                    </div>
                                ) : (
                                    <div className="mx-16 h-10">
                                        <SearchNotFound onFetchData={() => {
                                            // Xử lý không tìm thấy kết quả
                                        }}/>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {!isLoading && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            onPreviousPage={handlePreviousPage}
                            onNextPage={handleNextPage}
                        />
                    )}

                    {bookingReceive && (
                        <ReceiveBookingModal
                            booking={bookingReceive}
                            isOpen={!!bookingReceive}
                            onClose={handleCloseModalReceive}
                            onBookingReceived={handleBookingReceived}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
export default ListBooking;