import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify'
import "../../../css/booking/receiveBooking.css"
import * as bookingService from "../../../service/BookingService"
import {formatDate,formatTime,formatCurrency} from "../utils/Utils";
import {Document, Page, PDFViewer, StyleSheet, Text, View, pdf, Font} from "@react-pdf/renderer";

const ReceiveBookingModal = ({booking, isOpen, onClose, onBookingReceived}) => {
    const [showPDF, setShowPDF] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    Font.register({
        family: 'Open Sans',
        src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-U1UpcaXcl0Aw.ttf',
    });
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#FFF', // Màu nền trắng cho vé
            padding: 5,
            width: 74, // Chiều rộng tùy chỉnh cho vé
            height: 90, // Chiều cao tùy chỉnh cho vé
            // border: '1px solid #000', // Viền xung quanh vé
            // borderRadius: 5, // Bo góc cho vé
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Đổ bóng cho vé
        },
        section: {
            marginBottom: 1,
            marginTop: 1,
            padding: 2,
        },
        header: {
            fontSize: 4,
            marginBottom: 1,
            marginTop: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#070000', // Màu chữ tiêu đề
            fontFamily: 'Open Sans',
        },
        footer: {
            fontSize: 2.5,
            marginBottom: 1,
            marginTop: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#333', // Màu chữ tiêu đề
            fontFamily: 'Open Sans',
        },
        ticketInfo: {
            marginBottom: 1,
            marginTop: 1,
            fontSize: 2.5,
            color: '#070000', // Màu chữ thông tin vé
            fontFamily: 'Open Sans',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        label: {
            fontWeight: 'bold',
            fontSize: 2.5,
            fontFamily: 'Open Sans',
        },
        divider: {
            borderBottom: '0.2px dashed #000',
            marginVertical: 1,
        },
    });
    const Ticket = ({ booking }) => (
        <Document>
            <Page size={{ width: 74, height: 90 }} style={styles.page}>
                <Text style={styles.header}>Vé Xem Phim</Text>
                <Text style={styles.header}>* * *</Text>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Khách Hàng:</Text>
                        <Text style={styles.ticketInfo}>{booking.nameUser}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Mã Vé:</Text>
                        <Text style={styles.ticketInfo}>{booking.codeBooking}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Phim:</Text>
                        <Text style={styles.ticketInfo}>{booking.nameMovie}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Phòng:</Text>
                        <Text style={styles.ticketInfo}>{booking.roomName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Ghế:</Text>
                        <Text style={styles.ticketInfo}>{booking.seatNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}>Suất Chiếu:</Text>
                        <Text style={styles.ticketInfo}>{`${formatTime(booking.startTime)} ${formatDate(booking.showDate)}`}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={[styles.ticketInfo, styles.label]}> Tổng tiền:</Text>
                        <Text style={styles.ticketInfo}>{formatCurrency(booking.totalAmount)}đ</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={[styles.footer]}> ** Cảm ơn Quý khách **</Text>
                </View>
            </Page>
        </Document>
    );
    const receiveBooking = async () => {
        setIsProcessing(true); // Bắt đầu quá trình xử lý PDF
        const success = await bookingService.receiveBookingById(booking.id);
        if (success) {
            toast.success("Bạn đã in thành công vé: " + booking.codeBooking);
            if (onBookingReceived) {
                onBookingReceived(booking.id);
            }
            onClose();
            try {
                const blob = await pdf(<Ticket booking={booking} />).toBlob();
                const url = URL.createObjectURL(blob);

                const iframe = document.createElement('iframe');
                iframe.style.position = 'fixed';
                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.style.border = 'none';
                iframe.src = url;

                document.body.appendChild(iframe);

                iframe.onload = () => {
                    iframe.contentWindow.print(); // Mở hộp thoại in

                    // Theo dõi khi in xong
                    iframe.contentWindow.onafterprint = () => {
                        document.body.removeChild(iframe); // Xóa iframe sau khi in
                        setIsProcessing(false);
                        // onClose(); // Đóng modal sau khi in xong
                    };
                };
            } catch (error) {
                console.error("Error generating PDF:", error);
                toast.error("Có lỗi xảy ra khi in vé, vui lòng thử lại!");
                setIsProcessing(false); // Dừng quá trình xử lý nếu có lỗi
            }
        } else {
            toast.warning("Quá trình in thất bại, vui lòng kiểm tra lại!");
            onBookingReceived(booking.id);
            setIsProcessing(false); // Dừng quá trình xử lý nếu thất bại
        }
    };

    if (!isOpen) return null;

    return (
        <div className="tw-custom-modal">
            <div className="tw-custom-div-4">
                {/* Background overlay */}
                <div className="tw-background-overlay" aria-hidden="true"></div>
                {/* Modal panel */}
                <div className="tw-custom-modal-panel">
                    <div id="de_main" className="flex flex-wrap justify-center p-8 size-full shadow-md p-5">
                        <div className="mb-5">
                    <span className="flex justify-center">
                        <i className="fa-solid fa-check fa-beat-fade fa-5x"
                        style={{color: "#46e811"}}/>
                    </span>
                            <h1 className="font-bold text-2xl" style={{color: "black"}}> XÁC NHẬN IN VÉ </h1>
                        </div>
                        <div className="w-full relative overflow-x-auto sm:rounded-lg ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Mã đặt vé
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {booking.codeBooking}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Phim
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {booking.nameMovie}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Phòng
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {booking.roomName}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Ghế
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {booking.seatNumber}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Xuất chiếu
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {`${booking.startTime} ${formatDate(booking.showDate)}`}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Khách hàng
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {booking.nameUser}
                                    </td>
                                </tr>
                            </table>
                            <div className="w-full flex flex-wrap mt-5">
                                <div
                                    className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-start items-center space-x-2">
                                    <span>
                                        <i className="fa-solid fa-bullhorn fa-shake fa-lg"/>
                                    </span>
                                    <span className="text-red-500"> Lưu ý: Hành động này không thể hoàn tác !</span>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/2 p-2 flex justify-end items-center space-x-2">
                                    <button className="btn bg-green-500 text-white hover:bg-green-600 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => {
                                        receiveBooking()
                                        onClose()
                                    }}>
                                        <span> Xác nhận</span>
                                    </button>
                                    <button type={"reset"} className="btn bg-red-500 text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={onClose}>
                                        <span>Hủy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReceiveBookingModal;
