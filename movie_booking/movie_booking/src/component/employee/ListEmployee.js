import React, {useState, useEffect} from 'react';
import EmployeeTable from "./child_list/EmployeeTable";
import HeaderEmployee from "./child_list/HeaderEmployee";
import {fetchEmployees} from "../../service/EmployeeService";
import "../../css/employee/styles.css";
import Pagination from "./child_list/Pagination";
import DeleteEmployeeModal from "./child_list/DeleteEmployeeModal";
import SearchNotFound from "./child_list/SearchNotFound"

const ListEmployee = (() => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [employeeDelete, setEmployeeDelete] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [valueSearch, setValueSearch] = useState({valueSearch: ''});

    //Cập nhật hiển thị cho nhân viên sau khi xóa thành công
    const handleEmployeeDeleted = (employeeId) => {
        const newEmployees = employees.filter(employee => employee.id !== employeeId);
        setEmployees(newEmployees);
        fetchData(currentPage, valueSearch); // Cập nhật lại danh sách nhân viên
    };

    // Lấy dữ liệu
    const fetchData = async (page, valueSearch) => {
        const data = await fetchEmployees(page, valueSearch);
        setEmployees(data.content || []);
        setTotalPages(data.totalPages);
    };

    const handleOpenModalDelete = (employee) => setEmployeeDelete(employee);
    const handleCloseModalDelete = () => setEmployeeDelete(null);

    const handleSearch = (valueSearch) => {
        setValueSearch({valueSearch: valueSearch});
        // console.log(valueSearch);
        setCurrentPage(0);
        // fetchData(0, {valueSearch:valueSearch});
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

            <div className="tw-custom-header-table-zone sticky top-0 z-50">
                {/* Header */}
                <HeaderEmployee onSearch={handleSearch}/>
            </div>

            <div className="tw-table-zone">
                {/* Table */}
                <EmployeeTable
                    employees={employees}
                    handleOpenModalDelete={handleOpenModalDelete}
                />
            </div>

            {employees?.length === 0 && (
                <div className=" mx-16 h-10 ">
                    <SearchNotFound onFetchData={() => {
                        setValueSearch({valueSearch: ''})
                        fetchData(1, valueSearch)
                    }
                    }/>
                    {/*<SearchNotFound onFetchData={resetSearch} />*/}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
            />

            {employeeDelete && (
                <DeleteEmployeeModal
                    employee={employeeDelete}
                    isOpen={!!employeeDelete}
                    onClose={handleCloseModalDelete}
                    onEmployeeDeleted={handleEmployeeDeleted}
                />
            )}
        </>
    );
});
export default ListEmployee;