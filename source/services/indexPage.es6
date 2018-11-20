import baseService from './baseService.es6';

export function getIndexPageInfo() {
    return baseService.get('/WorkList/GetCountHistory');
}
export function getLatestAnnouncements() {
    return baseService.get('/PatientTab/GetAnnouncements');
}
