import axios from "axios";


export const getSearchMovie = async (nameMovie, director, releaseDate, nameStatus, actor, page) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-search-movie?nameMovie=${nameMovie}`+
            `&director=${director}&releaseDate=${releaseDate}&nameStatus=${nameStatus}&actor=${actor}&page=${page}`);
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
export const getSearchMovieByKindOfFilm = async (nameKind, page) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/search-movie-by-kind?nameKind=${nameKind}&page=${page}`);
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
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-list-movie-comming`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getMovieShowing = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-list-movie-showing`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getKindOfMovie = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-list-kindofmovie`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};
export const getStatusMovie = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-list-statusmovie`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};