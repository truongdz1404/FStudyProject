import axios from "axios";
import { API_BASE_URL } from "@/helpers/constants";
import AuthService from "./AuthService";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response, config } = error;
        const status = response?.status;

        if (status === 401 && !config._retry) {
            config._retry = true;
            try {
                await AuthService.refesh();
                return axios(config);
            } catch (error) {
                console.log(error);
                //TODO: Handle error or redict to login
            }
        }
        return Promise.reject(error);
    }
);

export default api;
