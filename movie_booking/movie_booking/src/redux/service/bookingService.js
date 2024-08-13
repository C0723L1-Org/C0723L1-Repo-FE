import request from '../axios-config'
const setUser = (id)=>{
    return request.get(`/user/${id}`)
}
const setShowtime = (showtime)=>{
    return  showtime
}
const setSeat = (seat)=>{
    return seat
}
const getAllSelectedSeat = (showtimeId,) =>{
    return request.get(`/seat/public/list`,{
        params:{
            showtimeId:showtimeId
        }
    })
}
const bookingService ={
    setUser,
    setShowtime,
    setSeat,
    getAllSelectedSeat
}
export default bookingService