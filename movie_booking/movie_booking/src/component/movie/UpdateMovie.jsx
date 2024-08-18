import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import {useNavigate, useParams} from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/solid';
import {toast} from "react-toastify";

function UpdateMovie() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [kindOfFilms, setKindOfFilms] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const { movieId } = useParams();

    const validationSchema = Yup.object().shape({
        nameMovie: Yup.string().required("Tên phim là bắt buộc"),
        releaseDate: Yup.string().required("Ngày phát hành là bắt buộc"),
        durationMovie: Yup.string()
            .test('is-numeric', 'Thời lượng phải là một số', value => {
                // Kiểm tra nếu giá trị là một số
                return !isNaN(value);
            })
            .test('greater-than-zero', 'Thời lượng phải lớn hơn 0', value => {
                // Kiểm tra nếu giá trị là số và lớn hơn 0
                return Number(value) > 0;
            })
            .required('Thời lượng là bắt buộc'),
        actor: Yup.string().required(" Tên diễn viên là bắt buộc")
            .min(5, 'Tên diễn viên phải có ít nhất 5 ký tự')
            .matches(/^[^\d]*$/, 'Tên diễn viên không được chứa số'),
        director: Yup.string().required("Tên đạo diễn là bắt buộc")
            .min(5, 'Tên đạo diễn phải có ít nhất 5 ký tự').
            matches(/^[^\d]*$/, 'Tên đạo diễn không được chứa số'),
        studio: Yup.string().required("Hãng phim là bắt buộc"),
        content: Yup.string().required("Nội dung là bắt buộc"),
        trailer: Yup.string().url("URL không hợp lệ").required("URL trailer là bắt buộc"),
        avatar: Yup.mixed(),
        poster: Yup.mixed(),
        // statusFilm: Yup.object().shape({
        //     id: Yup.number().required(),
        //     name: Yup.string().required()
        // }),
        kindOfFilm: Yup.array().of(Yup.number().required()).min(1, "Phải chọn ít nhất một thể loại phim").required("Phải chọn ít nhất một thể loại phim"),
    });

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/movie/private/find/${movieId}`);
                setMovie(response.data);
                setAvatarPreview(response.data.avatar);
                setPosterPreview(response.data.poster);

            } catch (error) {
                console.error("Không thể tải thông tin phim", error);
            }
        };

        const fetchKindOfFilms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/movie/private/list-kind-of-film");
                setKindOfFilms(response.data);
            } catch (error) {
                console.error("Không thể tải danh sách thể loại phim", error);
            }
        };

        fetchMovieDetails();
        fetchKindOfFilms();
    }, [movieId]);

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
            const avatarURL = values.avatar ? await uploadFile(values.avatar, "avatars/") : movie.avatar;
            const posterURL = values.poster ? await uploadFile(values.poster, "posters/") : movie.poster;

            const data = {
                ...values,
                avatar: avatarURL,
                poster: posterURL,
                kindOfFilm: values.kindOfFilm.map(id => ({ id })),
            };

            await axios.put(`http://localhost:8080/api/v1/movie/private/update/${movieId}`, data);
            toast.success(`Phim ${data.nameMovie} đã được cập nhật thành công.`);
            navigate("/");
        } catch (error) {
            console.error("Không thể cập nhật phim:", error);
            toast.error("Có lỗi xảy ra khi cập nhật phim.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!movie) return <div>Đang tải...</div>;

    return (
        <div className="container mx-auto p-8 max-w-6xl bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase">Cập nhật Phim</h2>
            <Formik
                initialValues={{
                    nameMovie: movie.nameMovie || "",
                    releaseDate: movie.releaseDate || "",
                    durationMovie: movie.durationMovie || "",
                    actor: movie.actor || "",
                    director: movie.director || "",
                    studio: movie.studio || "",
                    content: movie.content || "",
                    trailer: movie.trailer || "",
                    avatar: movie.avatar || "",
                    avatarURL: movie.avatar || "",
                    poster: movie.poster || "",
                    posterURL: movie.poster || "",
                    statusFilm: JSON.stringify(movie.statusFilm) || {},
                    kindOfFilm: movie.kindOfFilm.map(kind => kind.id) || [],
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
                                            <img src={avatarPreview} alt="Ảnh Đại Diện Xem Trước" className="max-w-full h-auto rounded-lg" />
                                        ) : (
                                            <p className="text-gray-500 text-center">Chọn ảnh đại diện</p>
                                        )}
                                        {avatarPreview && (
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAvatarPreview(null);
                                                    setFieldValue("avatar", null);
                                                }}
                                            >
                                                <XMarkIcon  className="w-6 h-6 text-red-500" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm mt-1" />
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
                                            <img src={posterPreview} alt="Ảnh Poster Xem Trước" className="max-w-full h-auto rounded-lg" />
                                        ) : (
                                            <p className="text-gray-500 text-center">Chọn ảnh poster</p>
                                        )}
                                        {posterPreview && (
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPosterPreview(null);
                                                    setFieldValue("poster", null);
                                                }}
                                            >
                                                <XMarkIcon  className="w-6 h-6 text-red-500" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ErrorMessage name="poster" component="div" className="text-red-500 text-sm mt-1" />
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
                                <ErrorMessage name="nameMovie" component="div" className="text-red-500 text-sm mt-1" />
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
                                <ErrorMessage name="releaseDate" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700 mb-2" htmlFor="durationMovie">
                                    Thời Lượng(phút):
                                </label>
                                <Field
                                    type="text"
                                    id="durationMovie"
                                    name="durationMovie"
                                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <ErrorMessage name="durationMovie" component="div" className="text-red-500 text-sm mt-1" />
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
                                <ErrorMessage name="actor" component="div" className="text-red-500 text-sm mt-1" />
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
                                <ErrorMessage name="director" component="div" className="text-red-500 text-sm mt-1" />
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
                                <ErrorMessage name="studio" component="div" className="text-red-500 text-sm mt-1" />
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
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
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
                            <ErrorMessage name="trailer" component="div" className="text-red-500 text-sm mt-1" />
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
                                <option value={JSON.stringify({ id: 1, name: "Đang chiếu" })}>
                                    Đang chiếu
                                </option>
                                <option value={JSON.stringify({ id: 2, name: "Sắp chiếu" })}>
                                    Sắp chiếu
                                </option>
                            </Field>
                            <ErrorMessage name="statusFilm" component="div" className="text-red-500 text-sm mt-1" />
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
                                            checked={values.kindOfFilm.includes(kind.id)}
                                        />
                                        <span className="text-gray-700">{kind.name}</span>
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage name="kindOfFilm" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-blue-600"
                            }`}
                        >
                            {isSubmitting ? "Đang gửi..." : "Cập Nhật Phim"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdateMovie;



