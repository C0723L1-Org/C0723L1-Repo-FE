import React, {useEffect} from "react";
import 'tailwindcss/tailwind.css';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import {useLocation, useNavigate} from "react-router-dom";
import request from "../../redux/axios-config";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/action/user-action";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    function setCookie(name, value, minutes) {
        let expires = "";
        if (minutes) {
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }
    const handleSubmit = async (values) => {
        try {
            const response = await request.post('/auth/public/authenticate', values)
            const token = response.data;
            // Lưu token vào localStorage hoặc cookie
            const jwtToken = response.data
            await setCookie(`jwt`,jwtToken,30)
            toast.success('Đăng nhập thành công!');
            await getUser()
            setTimeout( ()=>{
                navigate("/"); // Điều hướng đến trang hồ sơ sau khi đăng nhập thành công
            },1000)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;
                if (errorMessage === "Email not found") {
                    toast.error('Email không được tìm thấy');
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error('Sai thông tin email/  mật khẩu');
            }
            console.log(error);
        }
    };
    const getUser = async ()=>{
        try {
            let res= await request.get(`/auth/info`)
            dispatch(setUser(res.data))
        } catch (e) {
            console.log(e)
        }
    }

    const handleGoogleLogin = () => {
        // Thay thế URL này bằng URL OAuth của Google từ backend của bạn
        console.log("abc")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <div className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Đăng nhập</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) =>handleSubmit(values)
                    }
                >
                    {() => (
                        <Form className="space-y-4">
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
                                <FaLock className="mr-3"/>
                                <div className="flex-grow">
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="bg-transparent border-none w-full text-white"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
                            >
                                Đăng nhập
                            </button>
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="flex items-center py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
                                >
                                    <FaGoogle className="mr-3"/>
                                    Đăng nhập với Google
                                </button>
                            </div>
                            <div className="text-center">
                                    <span className="text-white">
                                        Bạn đã chưa có tài khoản? Bạn có thể{" "}
                                    </span>
                                <button
                                    onClick={() => {
                                        navigate("/register")
                                    }}
                                    type="button"
                                    className="text-blue-400 font-semibold underline hover:text-blue-700"
                                >
                                    đăng ký tại đây
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

export default Login;
