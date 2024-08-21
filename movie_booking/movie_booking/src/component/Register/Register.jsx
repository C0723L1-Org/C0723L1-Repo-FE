import React, {useEffect, useState} from "react";
import 'tailwindcss/tailwind.css';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { toast } from "react-toastify";
import {FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard, FaEyeSlash, FaEye} from 'react-icons/fa';
import {FaCalendarDays, FaLocationDot} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const Register = () => {
    useEffect(() => {
        document.title = `Register`
    }, []);
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, 'Tên phải có ít nhất 5 kí tự')
            .matches(/^[a-zA-Z\s]+$/, 'Tên không được chứa số hoặc ký tự đặc biệt')
            .required('Tên không được để trống'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        password: Yup.string()
            .min(6,'Mật khẩu phải có ít nhất 6 kí tự')
            .required('Mật khẩu không được để trống'),
        phoneNumber: Yup.string()
            .matches(/^(07|09)\d{8}$/, 'Số điện thoại phải bắt đầu bằng 07 hoặc 09 và chỉ nhập số')
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa số')
            .required('Số điện thoại không được để trống'),
        address: Yup.string().required('Địa chỉ không được để trống'),
        gender: Yup.mixed()
            .oneOf([true, false], 'Giới tính không được để trống')
            .required('Giới tính không được để trống'),
        cardId: Yup.string()
            .length(10, 'Số CCCD phải chứa đúng 10 kí tự')
            .matches(/^[0-9]+$/, 'Số CCCD chỉ chứa số')
            .required("Số CCCD không được để trống"),
        dayOfBirth: Yup.date()
            .max(new Date(), 'Ngày sinh không được là tương lai')
            .required('Ngày sinh không được để trống'),
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (values) => {
        try {
            await axios.post(' http://localhost:8080/api/v1/user/public/register', values);
            toast.success('Đăng ký thành công, hãy đăng nhập để sử dụng!');
            setTimeout( ()=>{
                navigate('/login'); // Điều hướng đến trang hồ sơ sau khi đăng nhập thành công
                // navigate('/test'); // Điều hướng đến trang hồ sơ sau khi đăng nhập thành công
            },1000)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = error.response.data;
                if (typeof errors === 'string') {
                    toast.error(errors);
                } else if (typeof errors === 'object') {
                    Object.keys(errors).forEach(key => {
                        toast.error(`${key}: ${errors[key]}`);
                    });
                }
            } else {
                toast.error('Đã xảy ra lỗi không mong muốn');
            }
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <div className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Đăng ký tài khoản</h1>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        phoneNumber: '',
                        address: '',
                        gender: '',
                        cardId: '',
                        dayOfBirth: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange }) => (
                        <Form className="space-y-4">
                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaUser className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Tên"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaEnvelope className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <label className="flex items-center">
                                            <Field
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="true"
                                                checked={values.gender === true}
                                                onChange={() => handleChange({target: {name: 'gender', value: true}})}
                                                className="form-radio text-blue-500"
                                            />
                                            <span className="ml-2">Nam</span>
                                        </label>
                                        <label className="flex items-center">
                                            <Field
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="false"
                                                checked={values.gender === false}
                                                onChange={() => handleChange({target: {name: 'gender', value: false}})}
                                                className="form-radio text-pink-500"
                                            />
                                            <span className="ml-2">Nữ</span>
                                        </label>
                                    </div>
                                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaPhone className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Số điện thoại"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaCalendarDays className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="date"
                                        id="dayOfBirth"
                                        name="dayOfBirth"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="dayOfBirth" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaIdCard className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="text"
                                        id="cardId"
                                        name="cardId"
                                        placeholder="CMND/CCCD"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="cardId" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md">
                                <FaLocationDot className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Địa chỉ"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-900 text-white p-2 rounded-md relative">
                                <FaLock className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
                            >
                                Đăng ký
                            </button>
                            <div className="text-center">
                                    <span className="text-white">
                                        Bạn đã có tài khoản? Bạn có thể{" "}
                                    </span>
                                <button
                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                    type="button"
                                    className="text-blue-400 font-semibold underline hover:text-blue-700"
                                >
                                    đăng nhập tại đây
                                </button>
                                .
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
