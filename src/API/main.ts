
import axios from "axios";

export const getRequestBuilder = (url: string) => {
    return axios.get(url);
}

