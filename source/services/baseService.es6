import axios from 'axios';
import browserHistory from '../browserHistory.es6';

import cookies from '../cookies.es6';

const baseService = axios.create({
    baseURL: 'http://apps.keystrokesinc.com/RevWservice'
});

baseService.addAuthToken = () => {
    baseService.defaults.headers.common['auth-Token'] = `${cookies.get('authToken')}`;
};

baseService.removeAuthToken = () => {
    cookies.remove('authToken');
    baseService.defaults.headers.common['auth-Token'] = '';
    browserHistory.push('/login');
};

baseService.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response.status === 401) {
        baseService.removeAuthToken();
    }
    return window.Promise.reject(error);
});

if (cookies.get('authToken')) {
    baseService.addAuthToken();
}

export default baseService;
