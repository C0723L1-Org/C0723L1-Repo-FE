import React, { useState, useEffect } from "react";
import axios from "axios";
import request  from "../../redux/axios-config"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../firebase-config";
import { XMarkIcon } from '@heroicons/react/24/solid';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {Main} from "../../layout/main/Main";

function CreateMovie() {
    const navigate = useNavigate();
    const [kindOfFilms, setKindOfFilms] = useState([]);
    const [statusFilm, setStatusFilm] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);

    // Validation schema cho form
    // cập nhật mới...........................
    const validationSchema = Yup.object().shape({
        nameMovie: Yup.string()
            .max(255, 'Tên phim không được vượt quá 255 ký tự')
            .required("Tên phim là bắt buộc"),
        releaseDate: Yup.string()
            .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Ngày phát hành phải theo định dạng dd/mm/yyyy")
            .test('after-2015', 'Ngày phát hành phải sau năm 2015', value => {
                const [day, month, year] = value.split('/').map(Number);
                return year > 2015;
            })
            .required("Ngày phát hành là bắt buộc"),
        durationMovie: Yup.string()
            .test('is-numeric', 'Thời lượng phải là một số', value => {
                return !isNaN(value);
            })
            .test('is-integer', 'Thời lượng phải là số nguyên', value => {
                return Number.isInteger(Number(value));
            })
            .test('greater-than-zero', 'Thời lượng phải lớn hơn 0', value => {
                return Number(value) > 0;
            })
            .test('max-duration', 'Thời lượng phải dưới 300 phút', value => {
                return Number(value) <= 300;
            })
            .required('Thời lượng là bắt buộc'),
        actor: Yup.string()
            .max(150, 'Tên diễn viên không được vượt quá 150 ký tự')
            .required("Tên diễn viên là bắt buộc")
            .min(5, 'Tên diễn viên phải có ít nhất 5 ký tự')
            .matches(/^[^\d]*$/, 'Tên diễn viên không được chứa số'),
        director: Yup.string()
            .max(150, 'Tên đạo diễn không được vượt quá 150 ký tự')
            .required("Tên đạo diễn là bắt buộc")
            .min(5, 'Tên đạo diễn phải có ít nhất 5 ký tự')
            .matches(/^[^\d]*$/, 'Tên đạo diễn không được chứa số'),
        studio: Yup.string()
            .max(255, 'Hãng phim không được vượt quá 255 ký tự')
            .required("Hãng phim là bắt buộc"),
        content: Yup.string()
            // .max(255, 'Nội dung không được vượt quá 255 ký tự')
            .required("Nội dung là bắt buộc"),
        trailer: Yup.string()
            .url("Định dạng URL không hợp lệ")
            .max(255, 'URL trailer không được vượt quá 255 ký tự')
            .required("URL trailer là bắt buộc"),
        avatar: Yup.mixed()
            .required("Ảnh đại diện là bắt buộc")
            .test('fileFormat', 'Chỉ chấp nhận tệp .jpg', value => {
                return value && value.type === 'image/jpeg';
            }),
        statusFilm: Yup.string().required('Không được trống'),
        poster: Yup.mixed()
            .required("Ảnh poster là bắt buộc")
            .test('fileFormat', 'Chỉ chấp nhận tệp .jpg', value => {
                return value && value.type === 'image/jpeg';
            }),
        kindOfFilm: Yup.array()
            .of(Yup.number().required())
            .min(1, "Ít nhất một thể loại phim phải được chọn")
            .required("Ít nhất một thể loại phim phải được chọn"),
    });

    useEffect(() => {
        const fetchKindOfFilms = async () => {
            try {
                const response = await request.get(
                    "/movie/private/list-kind-of-film"
                );
                setKindOfFilms(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thể loại phim", error);
            }
        };

        fetchKindOfFilms();
    }, []);
    useEffect(() => {
        const fetchStatusFilms = async () => {
            try {
                const response = await request.get(
                    "/movie/private/list-status-film"
                );
                setStatusFilm(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách trạng thái phim", error);
            }
        };

        fetchStatusFilms();
    }, []);

    const uploadFile = async (file, path) => {
        if (file) {
            const fileRef = ref(storage, `${path}${file.name}`);
            await uploadBytes(fileRef, file);
            return await getDownloadURL(fileRef);
        }
        return "";
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const avatarURL = await uploadFile(values.avatar, "avatars/");
            const posterURL = await uploadFile(values.poster, "posters/");

            const data = {
                ...values,
                avatar: avatarURL,
                poster: posterURL,
                kindOfFilm: values.kindOfFilm.map((id) => ({ id })),
            };

            const response = await request.post(
                "/movie/private/create",
                data
            );
            toast.success(`Phim ${data.nameMovie} đã được thêm mới thành công.`);
            navigate("/movie-manager");
        } catch (error) {
            console.error("Lỗi khi tạo phim:", error);
            toast.error("Có lỗi xảy ra khi thêm mới phim.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveImage = (type) => {
        if (type === "avatar") {
            setAvatarPreview(null);
        } else if (type === "poster") {
            setPosterPreview(null);
        }
    };

    return (
        <Main content={
        <div className="container mx-auto p-8 max-w-6xl bg-white shadow-lg rounded-lg">
            <Link to="/movie-manager">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </span>
            </Link>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase">Thêm mới Phim</h2>
            <Formik
                initialValues={{
                    nameMovie: "",
                    releaseDate: "",
                    durationMovie: "",
                    actor: "",
                    director: "",
                    studio: "",
                    content: "",
                    trailer: "",
                    avatar: null,
                    poster: null,
                    statusFilm: {},
                    kindOfFilm: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Avatar and Poster */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="relative flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="avatar">
                                    Ảnh Đại Diện:
                                </label>
                                <div
                                    className="relative border-2 border-gray-300 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                                    onClick={() => document.getElementById('avatar').click()}
                                >
                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue("avatar", file);
                                            setAvatarPreview(URL.createObjectURL(file));
                                        }}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-center p-4">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Ảnh Đại Diện Xem Trước"
                                                 className="max-w-full h-auto rounded-lg"/>
                                        ) : (
                                            <p className="text-gray-500 text-center">Chọn ảnh đại diện</p>
                                        )}
                                        {avatarPreview && (
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveImage("avatar");
                                                    setFieldValue("avatar", null);
                                                }}
                                            >
                                                <XMarkIcon className="w-6 h-6 text-red-500"/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="relative flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="poster">
                                    Poster:
                                </label>
                                <div
                                    className="relative border-2 border-gray-300 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                                    onClick={() => document.getElementById('poster').click()}
                                >
                                    <input
                                        type="file"
                                        id="poster"
                                        name="poster"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue("poster", file);
                                            setPosterPreview(URL.createObjectURL(file));
                                        }}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-center p-4">
                                        {posterPreview ? (
                                            <img src={posterPreview} alt="Ảnh Poster Xem Trước"
                                                 className="max-w-full h-auto rounded-lg"/>
                                        ) : (
                                            <p className="text-gray-500 text-center">Chọn ảnh poster</p>
                                        )}
                                        {posterPreview && (
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveImage("poster");
                                                    setFieldValue("poster", null);
                                                }}
                                            >
                                                <XMarkIcon className="w-6 h-6 text-red-500"/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ErrorMessage name="poster" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        {/* Main Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="nameMovie">
                                    Tên Phim:
                                </label>
                                <Field
                                    type="text"
                                    id="nameMovie"
                                    name="nameMovie"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="nameMovie" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="releaseDate">
                                    Ngày Phát Hành (dd/mm/yyyy):
                                </label>
                                <Field
                                    type="text"
                                    id="releaseDate"
                                    name="releaseDate"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="dd/mm/yyyy"
                                />
                                <ErrorMessage name="releaseDate" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="durationMovie">
                                    Thời Lượng(Phút):
                                </label>
                                <Field
                                    type="text"
                                    id="durationMovie"
                                    name="durationMovie"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="durationMovie" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="actor">
                                    Diễn Viên:
                                </label>
                                <Field
                                    type="text"
                                    id="actor"
                                    name="actor"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="actor" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="director">
                                    Đạo Diễn:
                                </label>
                                <Field
                                    type="text"
                                    id="director"
                                    name="director"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="director" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="studio">
                                    Hãng Phim:
                                </label>
                                <Field
                                    type="text"
                                    id="studio"
                                    name="studio"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="studio" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        <div className="flex flex-col mb-8">
                            <label className="font-semibold text-gray-700 mb-2" htmlFor="content">
                                Nội Dung:
                            </label>
                            <Field
                                as="textarea"
                                id="content"
                                name="content"
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                rows="6"
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className="flex flex-col mb-8">
                            <label className="font-semibold text-gray-700 mb-2" htmlFor="trailer">
                                URL Trailer:
                            </label>
                            <Field
                                type="text"
                                id="trailer"
                                name="trailer"
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="http://example.com/trailer"
                            />
                            <ErrorMessage name="trailer" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className="flex flex-col mb-8">
                            <label className="font-semibold text-gray-700 mb-2" htmlFor="statusFilm">
                                Trạng Thái Phim:
                            </label>
                            <Field
                                as="select"
                                id="statusFilm"
                                name="statusFilm"
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="">Chọn trạng thái</option>
                                {/*<option value={JSON.stringify({id: 1, name: "Đang chiếu"})}>*/}
                                {/*    Đang chiếu*/}
                                {/*</option>*/}
                                {/*<option value={JSON.stringify({id: 2, name: "Sắp chiếu"})}>*/}
                                {/*    Sắp chiếu*/}
                                {/*</option>*/}
                                {
                                    statusFilm.map((i, index) => (
                                        <option key={index} value={JSON.stringify({id: i.id, name: i.name})}>{i.name}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage name="statusFilm" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        {/* Kind of Film */}
                        <div className="flex flex-col mb-8">
                            <label className="font-semibold text-gray-700 mb-2">Thể Loại Phim:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {kindOfFilms.map((kind) => (
                                    <label key={kind.id} className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="kindOfFilm"
                                            value={kind.id.toString()}
                                            className="mr-2 accent-indigo-600"
                                        />
                                        <span className="text-gray-700">{kind.name}</span>
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage name="kindOfFilm" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-blue-600"
                            }`}
                        >
                            {isSubmitting ? "Đang gửi..." : "Tạo Phim"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        }/>
    );
}

export default CreateMovie;
