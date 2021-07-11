import axios from 'axios';
import QS from 'qs';
import { message } from 'antd';
import cookie from 'react-cookies';
import { HashRouter } from 'react-router-dom';

const router = new HashRouter();
export const basciUrl = 'http://localhost:8080';
const $http = axios.create({
    baseURL: basciUrl,
});

$http.interceptors.request.use((config) => {
/**
 *   Whether there is a token in the local storage before each request is sent,
 *   or you can use Redux here to demonstrate only getting the token locally
 *   If it exists, add the token to the header of the http request uniformly,
 *   so that the background judges your login status based on the token
 *   Even if there is a token locally, it is possible that the token is expired,
 *   so the return status should be judged in the response interceptor.
 */

    const token = cookie.load('user');
    config.data = { ...config.data };
    config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
    };
    // config.data = QS.stringify(config.data);
    return config;
}, (error) => {
    return error;
});

$http.interceptors.response.use((response) => {
    if (response.data.code) {
        switch (response.data.code) {
            case 0:
                // success
                return response.data;
            case 301:
                // unauth
                message.error(response.data.content);
                router.history.push('/login');
                break;
            case 403:
                // token expired
                message.error(response.data.content);
                router.history.push('/login');
                break;
            default:
                message.error(response.data.content);
        }
    } else {
        return response;
    }
});
export default $http;
