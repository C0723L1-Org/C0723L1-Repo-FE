import axios from "axios";

export default  axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true// Cho phép gửi cookie
})