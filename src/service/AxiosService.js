import axios from 'axios';

class AxiosService {
    constructor() {
    }

    getAxios(url, header) {
        return axios.get(url, header);
    }

    postAxios(url, body, header) {
        return axios.post(url, body, header);
    }

    putAxios(url, body, header) {
        return axios.put(url, body, header);
    }
}

export default AxiosService;
