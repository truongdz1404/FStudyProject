import axios from "axios";
import { API_BASE_URL } from "@/helpers/constants";
import AuthService from "./AuthService";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};
const refreshToken = async () => {
    try {
        await AuthService.refreshToken();
        processQueue(null);
    } catch (error) {
        processQueue(error);
        throw error;
    }
};

const getNewToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;
        await refreshToken();
        isRefreshing = false;
        return;
    }
    return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
    });
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response, config } = error;
        const status = response?.status;
        const shouldRenewToken = status === 401 && !config._retry;
        if (shouldRenewToken) {
            config._retry = true;
            try {
                await getNewToken();
                return axios(config);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
