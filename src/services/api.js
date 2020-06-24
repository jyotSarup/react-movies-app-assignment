import axios from "axios";

import { API_KEY, BASE_URL } from "../config/api_config";

const url = BASE_URL;

export const getMoviesOrTv = async (type, subType, page) => {
    let movies_data = await axios.get(
        `${url}/${type}/${subType}?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return movies_data;
};

export const getSearchResults = async (searchText, type, page) => {
    let results = await axios.get(
        `${url}/search/${type}?api_key=${API_KEY}&query=${searchText}&language=en-US&page=${page}`
    );
    return results;
};
