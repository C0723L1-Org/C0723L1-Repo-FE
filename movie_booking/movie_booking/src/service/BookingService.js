import axios from "axios";
import request from "../redux/axios-config"


//Bùi Thế Thiên
export const fetchBookings = async (page, valueSearch = null) => {
    try {
        let url = `/booking/private/list-booking?page=${page}`;
        if (valueSearch) {
            const queryParams = new URLSearchParams(valueSearch).toString();
            url += `&${queryParams}`;
            console.log(queryParams);
            console.log(url);
        }
        const response = await request.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking data:', error);
        return {content: [], totalPages: 1};
    }
};

export const receiveBookingById = async (id) => {
    try {
        let res = await request.put(`/booking/private/receive-booking/${id}`, {},
        )
        return res.status === 200
    } catch (e) {
        console.log("Error at BookingService/receiveBookingById:", e.message);
        return false;
    }
}