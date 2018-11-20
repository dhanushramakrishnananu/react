import * as homeConstants from '../../../../constants/actions/home.es6';
import * as homeService from '../../../../services/homeService.es6';
import notifications from '../../../../notifications.jsx';

export function getTasksList(loginData) {
    return (dispatch) => {
        dispatch({type: homeConstants.GET_TASK_LISTS});
        homeService.getTasksList(loginData)
            .then((response) => {
                dispatch({type: homeConstants.GET_TASK_LISTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: homeConstants.GET_TASK_LISTS_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}
export function getTaskListDetails(taskListId) {
    return (dispatch) => {
        dispatch({type: homeConstants.GET_TASK_LIST_DETAILS, payload: {
            taskListId: taskListId
        }});
        homeService.getTaskListDetails(taskListId)
            .then((response) => {
                dispatch({type: homeConstants.GET_TASK_LIST_DETAILS_SUCCESS, payload: {
                    patients: response.data,
                    taskListId: taskListId
                }});
            })
            .catch((response) => {
                dispatch({type: homeConstants.GET_TASK_LIST_DETAILS_ERROR, payload: {
                    error: response,
                    taskListId: taskListId
                }});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}