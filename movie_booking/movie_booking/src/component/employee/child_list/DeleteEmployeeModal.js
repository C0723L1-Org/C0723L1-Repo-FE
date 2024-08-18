import React from 'react';
import * as employeeService from "../../../service/EmployeeService"
import {toast} from 'react-toastify'
import "../../../css/employee/deleteEmployee.css"
import {WarningIcon} from "../utils/Icons";
import '@fortawesome/fontawesome-free/css/all.min.css';
const DeleteEmployeeModal = ({employee, isOpen, onClose, onEmployeeDeleted}) => {
    const deleteEmployee = async () => {
        await employeeService.deleteEmployeeById(employee.id)
            .then((success) => {
                if (success) {
                    toast.success("Bạn đã xóa thành công nhân viên: " + employee.name)
                    if (onEmployeeDeleted) {
                        onEmployeeDeleted(employee.id); // Gọi callback để cập nhật danh sách nhân viên sau khi đã xóa thành công
                    }
                } else {
                    toast.warning("Quá trình xóa thất bại, vui lòng kiểm tra lại !");
                }
            })
    }
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
                        <i className="fa-solid fa-triangle-exclamation fa-beat-fade fa-5x"
                           style={{color: "#e01f1f"}}/>
                    </span>
                            <h1 className="font-bold text-2xl" style={{color: "red"}}>XÁC NHẬN XOÁ NHÂN VIÊN </h1>
                        </div>

                        <div className="w-full relative overflow-x-auto sm:rounded-lg ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Mã Nhân viên
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.code}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Tên Nhân viên
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.name}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Giới tính
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.gender ? "Nữ" : "Nam"}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Số CCCD
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.cardId}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Số điện thoại
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.phoneNumber}
                                    </td>
                                </tr>
                                <tr className=" border-b  hover:bg-gray-50 ">
                                    <th scope="row"
                                        className="px-6 py-4 text-gray-900 font-medium text-gray-900 whitespace-nowrap ">
                                        Địa chỉ
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {employee.address}
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
                                    <button className="btn bg-red-500 text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => {
                                        deleteEmployee()
                                        onClose()
                                    }}>
                                        <span> Xác nhận</span>
                                    </button>
                                    <button type={"reset"} className="btn bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={onClose}>
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

export default DeleteEmployeeModal;