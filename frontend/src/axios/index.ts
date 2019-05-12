import axios from 'axios';

const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
    axios.defaults.headers = {
        'Authorization': `Bearer ${accessToken}`,
    };
};

export default axios;
