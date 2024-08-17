import axios from "axios";


export const getSearchMovie = async (nameMovie, director, releaseDate, nameStatus, nameKind, actor, page) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/public/show-search-movie?nameMovie=${nameMovie}`+
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
        const response = await axios.get(`http://localhost:8080/api/v1/movie/private/list-kind-of-film`);
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

export const getFindAllMovie = async (pageNumber , pageSize ) => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/movie/private/list-movie', {
            params: {
                pageNumber,
                pageSize
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { content: [], totalElements: 0 };
    }
};


export const getFindAllStatus = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/movie/private/list-status-film');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error + " error");
        return null;
    }
};

export const getFindAllKindOfFilm = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/movie/private/list-kind-of-film');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error + " error");
        return null;
    }
};

export const deleteById = async (id) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/movie/private/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error + " error");
        return null;
    }
};

export const deleteByIds = async (ids) => {
    try {
        const params = new URLSearchParams();
        ids.forEach(id => params.append('id', id));

        const response = await axios.put('http://localhost:8080/api/v1/movie/private/list-delete', null, { params });
        return response.data;
    } catch (error) {
        console.log(error + " error");
        return null;
    }
};

export const searchMovie = async (nameMovie, content, director, releaseDateFrom,
                                  releaseDateTo, nameStatus, actor, pageNumber, pageSize) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/movie/private/searches`, {
            params: {
                nameMovie,
                content,
                director,
                releaseDateFrom,
                releaseDateTo,
                nameStatus,
                actor,
                pageNumber,
                pageSize
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie images:", error);
        return [];
    }
};