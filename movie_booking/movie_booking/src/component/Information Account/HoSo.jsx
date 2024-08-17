import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Row } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function HoSo() {
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
            const { data } = await axios.get('/api/v1/user/public/profile', config);
            setUser(data);
            setFormValues(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        fetchUser(); // Reset lại giá trị của form với dữ liệu gốc
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            await axios.put(`/api/v1/user/update/${user.id}`, formValues, config);
            toast.success('Thông tin người dùng đã được cập nhật!');
            setIsEditing(false);
            fetchUser(); // Refresh user data after update
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
            toast.error('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-[1170px] min-h-[calc(100vh-69px)] mx-auto px-4 py-6">
            <div className="flex flex-row gap-12 justify-start items-start">
                <Sidebar />
                <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4 bg-white rounded-lg shadow-md">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-5xl sm:rounded-lg">
                            <h1 className="pl-6 font-bold sm:text-3xl text-center text-gray-800">Thông tin cá nhân</h1>
                            <div className="mt-8 overflow-x-auto">
                                <Row className="user-info-container">
                                    <FaPencilAlt className="absolute right-52 -translate-y-1/2 cursor-pointer" onClick={handleEditClick} />
                                    <div className="user-card p-4 mb-4 border border-gray-200 rounded-lg shadow-md">
                                        <div className="flex flex-wrap">
                                            {/* Trường cho phép chỉnh sửa */}
                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Name:</span>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formValues.name}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span>{user.name}</span>
                                                )}
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Address:</span>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formValues.address}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span>{user.address}</span>
                                                )}
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Card ID:</span>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="cardId"
                                                        value={formValues.cardId}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span>{user.cardId}</span>
                                                )}
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Ngày sinh</span>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="dayOfBirth"
                                                        value={formValues.dayOfBirth}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span>{user.dayOfBirth}</span>
                                                )}
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Gender:</span>
                                                {isEditing ? (
                                                    <select
                                                        name="gender"
                                                        value={formValues.gender}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    >
                                                        <option value="true">Male</option>
                                                        <option value="false">Female</option>
                                                    </select>
                                                ) : (
                                                    <span>{user.gender ? "Male" : "Female"}</span>
                                                )}
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Phone Number:</span>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        value={formValues.phoneNumber}
                                                        onChange={handleInputChange}
                                                        className="pl-2 w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span>{user.phoneNumber}</span>
                                                )}
                                            </div>

                                            {/* Trường luôn vô hiệu hóa */}
                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Email:</span>
                                                <span>{user.email}</span>
                                            </div>

                                            <div className="w-full md:w-1/2 mb-4 relative">
                                                <span className="font-semibold text-gray-700">Code:</span>
                                                <span>{user.code}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <div className="flex justify-end mt-4">
                                            <button
                                                className="mr-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
                                                onClick={handleSaveClick}
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700"
                                                onClick={handleCancelClick}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoSo;
