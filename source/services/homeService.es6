import baseService from './baseService.es6';

export function getTasksList() {
    return baseService.get('/WorkList/GetEmployeeHistory');
}

export function getTaskListDetails(taskListId) {
    return baseService.get(`/WorkList/GetTaskListDetails/${taskListId}`);
}
