import axios from 'axios';

const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
    headers: {
        "Authorization": `Bearer ${accessToken}`,
    },
    baseURL: '/api',
});

// @ts-ignore
window.axios = axiosInstance;

export default axiosInstance;
