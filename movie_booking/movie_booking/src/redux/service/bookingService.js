import request from '../axios-config'
const getUser = (id)=>{
    return request.get(`/user/${id}`)
}
const getShowtime = (movieId, date)=>{
    return request.get(`/showtime?movieId=${movieId}&date=${date}`)
}
const getSeat = (id)=>{
    return request.get(`/seat/${id}`)
}
const  createBooking = (booking) =>{
    return request.post(`/booking/create`,booking)
}
const bookingService ={
    getUser,
    getShowtime,
    getSeat,
    createBooking
}
export default bookingService