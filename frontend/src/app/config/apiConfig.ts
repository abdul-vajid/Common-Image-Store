import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = (token: String | null) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    });

    return axiosInstance
}

export default axiosPublic;