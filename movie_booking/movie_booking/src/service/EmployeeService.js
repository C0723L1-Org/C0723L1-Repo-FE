import axios from "axios";

//Bùi Thế Thiên
export const fetchEmployees = async (page, valueSearch = null) => {
    try {
        let url = `http://localhost:8080/api/v1/user/private/list-employee?page=${page}`;
        if (valueSearch) {
            const queryParams = new URLSearchParams(valueSearch).toString();
            url += `&${queryParams}`;
            console.log(queryParams);
            console.log(url);
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return {content: [], totalPages: 1};
    }
};

export const deleteEmployeeById = async (id) => {
    try {
        let res = await axios.put(`http://localhost:8080/api/v1/user/private/delete-employee/${id}`, {},
        )
        return res.status === 200
    } catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:", e.message);
        return false;
    }
}