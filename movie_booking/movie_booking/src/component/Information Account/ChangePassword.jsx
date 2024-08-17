import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from "./Sidebar";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveClick = async () => {
        if (newPassword !== confirmationPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('authToken'); // Hoặc lấy từ nơi khác nếu bạn lưu trữ token ở nơi khác
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put('http://localhost:8080/api/v1/user/change-password', { oldPassword: currentPassword, newPassword }, config);
            toast.success('Mật khẩu đã được thay đổi thành công!');
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Lỗi: ${error.response.data.message}`);
            } else {
                toast.error('Đã xảy ra lỗi không xác định.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-[1170px] min-h-[calc(100vh-69px)] mx-auto px-4 py-6">
            <div className="flex flex-row gap-12 justify-start items-start">
                <Sidebar/>
                <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Thay đổi mật khẩu</h2>
                        <div className="mb-4">
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                Mật khẩu cũ
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmationPassword" className="block text-sm font-medium text-gray-700">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                type="password"
                                id="confirmationPassword"
                                value={confirmationPassword}
                                onChange={(e) => setConfirmationPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveClick}
                            className={`mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Đang cập nhật...' : 'Lưu'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
