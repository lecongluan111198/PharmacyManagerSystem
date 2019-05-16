import axios from 'axios';

const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
    axios.defaults.headers = {
        'Authorization': `Bearer ${accessToken}`,
    };
}

// @ts-ignore
window.axios = axios;

export default axios;
