import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Row } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import request from "../../redux/axios-config";
import { Main } from "../../layout/main/Main";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Tạo schema validate với Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Tên phải có ít nhất 5 kí tự')
        .required('Tên không được để trống'),
    dayOfBirth: Yup.date()
        .max(new Date(), 'Ngày sinh không được là tương lai')
        .required('Ngày sinh không được để trống'),
    cardId: Yup.string()
        .length(10, 'Số CCCD phải chứa đúng 10 kí tự')
        .matches(/^[0-9]+$/, 'ID card chỉ chứa số')
        .required('ID card không được để trống'),
    phoneNumber: Yup.string()
        .matches(/^(07|09)\d{8}$/, 'Số điện thoại phải bắt đầu bằng 07 hoặc 09 và chỉ nhập số')
        .required('Số điện thoại không được để trống'),
});

function HoSo() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        gender: '',
        email: '',
        address: '',
        dayOfBirth: '',
        cardId: '',
        phoneNumber: ''
    });



    useEffect(() => {
        document.title="Hồ Sơ"
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await request.get('/user/public/profile', config);
            setUser(data);
            setFormValues(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        fetchUser(); // Reset lại giá trị của form với dữ liệu gốc
    };

    const handleSaveClick = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            await request.put(`/user/update/${user.id}`, values, config);
            toast.success('Thông tin người dùng đã được cập nhật!');
            setIsEditing(false);
            fetchUser(); // Refresh user data after update
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
            toast.error(error.response.data); // Hiển thị thông báo lỗi từ backend
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Main content={
            <div className="max-w-[1170px] min-h-[calc(100vh-69px)] mx-auto px-4 py-6">
                <div className="flex flex-row gap-12 justify-start items-start">
                    <Sidebar />
                    <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                        <div className="p-2 md:p-4 bg-white rounded-lg shadow-md">
                            <div className="w-full px-6 pb-8 mt-8 sm:max-w-5xl sm:rounded-lg">
                                <h1 className="pl-6 font-bold sm:text-3xl text-center text-gray-800">Thông tin cá nhân</h1>
                                <div className="mt-8 overflow-x-auto">
                                    <Row className="user-info-container">
                                        <FaPencilAlt className="absolute right-52 -translate-y-1/2 cursor-pointer" onClick={handleEditClick}
                                                     title="Chỉnh sửa thông tin" />
                                        {isEditing ? (
                                            <Formik
                                                initialValues={formValues}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSaveClick}
                                            >
                                                <Form>
                                                    <div className="user-card p-4 mb-4 border border-gray-200 rounded-lg shadow-md">
                                                        <div className="flex flex-wrap">
                                                            {/* Trường cho phép chỉnh sửa */}
                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Tên: </span>
                                                                <Field
                                                                    type="text"
                                                                    name="name"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                />
                                                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                                            </div>

                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Địa chỉ: </span>
                                                                <Field
                                                                    type="text"
                                                                    name="address"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                />
                                                            </div>

                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Số CCCD: </span>
                                                                <Field
                                                                    type="text"
                                                                    name="cardId"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                />
                                                                <ErrorMessage name="cardId" component="div" className="text-red-500 text-sm" />
                                                            </div>

                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Ngày sinh: </span>
                                                                <Field
                                                                    type="text"
                                                                    name="dayOfBirth"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                />
                                                                <ErrorMessage name="dayOfBirth" component="div" className="text-red-500 text-sm" />
                                                            </div>

                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Giới tính: </span>
                                                                <Field
                                                                    as="select"
                                                                    name="gender"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                >
                                                                    <option value="true">Nam</option>
                                                                    <option value="false">Nữ</option>
                                                                </Field>
                                                            </div>

                                                            <div className="w-full md:w-1/2 mb-6 relative">
                                                                <span className="font-semibold text-gray-700">Số điện thoại: </span>
                                                                <Field
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                                />
                                                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full mt-4 flex justify-end">
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                            Xác nhận
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                                            onClick={handleCancelClick}
                                                        >
                                                            Hủy
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        ) : (
                                            <div className="user-card p-4 mb-4 border border-gray-200 rounded-lg shadow-md">
                                                <div className="flex flex-wrap">
                                                    {/* Trường chỉ đọc */}
                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Tên: </span>
                                                        <span>{user.name}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Địa chỉ: </span>
                                                        <span>{user.address}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Số CCCD: </span>
                                                        <span>{user.cardId}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Ngày sinh: </span>
                                                        <span>{user.dayOfBirth}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Giới tính: </span>
                                                        <span>{user.gender ? "Male" : "Female"}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Số điện thoại: </span>
                                                        <span>{user.phoneNumber}</span>
                                                    </div>

                                                    {/* Trường luôn vô hiệu hóa */}
                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Email: </span>
                                                        <span>{user.email}</span>
                                                    </div>

                                                    <div className="w-full md:w-1/2 mb-6 relative">
                                                        <span className="font-semibold text-gray-700">Mã khách hàng: </span>
                                                        <span>{user.code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }/>
    );
}

export default HoSo;
