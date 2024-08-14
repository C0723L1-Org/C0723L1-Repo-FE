import axios from "axios";
import request from "../../redux/axios-config";


export const getSearchMovie = async (nameMovie, director, releaseDate, nameStatus, nameKind, actor, page) => {
    try {
        const response = await request.get(`/movie/public/show-search-movie?nameMovie=${nameMovie}`+
            `&director=${director}&releaseDate=${releaseDate}&nameStatus=${nameStatus}&nameKind=${nameKind}&actor=${actor}&page=${page}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Có lỗi xảy ra trong quá trình tìm kiếm.');
        }
    }
}

export const getMovieComming = async () => {
    try {
        const response = await request.get(`/movie/public/show-list-movie-comming`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getMovieShowing = async () => {
    try {
        const response = await request.get(`/movie/public/show-list-movie-showing`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getKindOfMovie = async () => {
    try {
        const response = await request.get(`/movie/public/show-list-kindofmovie`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getStatusMovie = async () => {
    try {
        const response = await request.get(`/movie/public/show-list-statusmovie`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};

// export const getMovieAvatars = async (nameSearch, page) => {
//     try {
//         if (page < 1) {
//             page = 1;
//         }
//         const response = await axios.get(
//             `http://localhost:8080/api/v1/movie?searchContent=${nameSearch}` +
//             `&_page=${page}&_limit=5`
//         );
//
//         return response.data;
//     } catch (e) {
//         console.error("Error finding Movies:", e);
//         return [];
//     }
// };
