import React from 'react';
import {DeleteIcon,EditIcon} from "../utils/Icons";
import "../../../css/employee/styles.css";
import {formatDate} from "../utils/Utils";
const EmployeeTable = ({employees, handleOpenModalDelete}) => {

    return (
        <>
            <table className="tw-custom-table ">
                <thead className="tw-custom-thead">
                <tr className="tw-custom-first-tr">
                    <th scope="col" className="tw-custom-th"> Mã Nhân viên</th>
                    <th scope="col" className="tw-custom-th"> Nhân viên</th>
                    <th scope="col" className="tw-custom-th"> Giới tính</th>
                    <th scope="col" className="tw-custom-th"> Ngày sinh</th>
                    <th scope="col" className="tw-custom-th"> Số CCCD</th>
                    <th scope="col" className="tw-custom-th"> Email</th>
                    <th scope="col" className="tw-custom-th"> Số điện thoại</th>
                    <th scope="col" className="tw-custom-th"> Địa chỉ</th>
                    <th scope="col" className="tw-custom-th"></th>
                </tr>
                </thead>
                <tbody className="tw-custom-tbody">
                {employees.map((employee) => (
                    <tr key={employee.id} className="tw-custom-second-tr">
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Mã nhân viên </span>
                            {employee.code}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Tên nhân viên </span>
                            {employee.name}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Giới tính</span>
                            {employee.gender ? "Nữ" : "Nam"}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Ngày sinh</span>
                            {formatDate(employee.dateOfBirth)}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Số CCCD</span>
                            {employee.cardId}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1">Email</span>
                            {employee.email}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Số điện thoại </span>
                            {employee.phoneNumber}
                        </td>
                        <td className="tw-custom-td">
                            <span className="tw-custom-span-1"> Địa chỉ </span>
                            {employee.address}
                        </td>
                        <td className="tw-custom-td">
                            <div className="tw-custom-div-3">
                                <button>
                                    <EditIcon/>
                                </button>
                                <button onClick={() => handleOpenModalDelete(employee)}>
                                    <DeleteIcon/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default EmployeeTable;