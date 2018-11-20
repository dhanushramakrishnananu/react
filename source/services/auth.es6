import baseService from './baseService.es6';
import qs from 'qs';

export function login(data) {
    return baseService.post('/auth/RevLogin', qs.stringify(data));
}

export function getCurrentUser() {
    return baseService.get('/auth/getLoggedDetails');
}

export function logout() {
    return baseService.post('/auth/logout');
}
