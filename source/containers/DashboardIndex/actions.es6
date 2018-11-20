import * as indexPageActionsConstants from '../../constants/actions/indexPage.es6';
import * as indexPageService from '../../services/indexPage.es6';
import notifications from '../../notifications.jsx';
import * as homeConstants from '../../constants/actions/home.es6';

export function getIndexPageInfo() {
    return (dispatch) => {
        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
        dispatch({type: indexPageActionsConstants.GET_INDEX_PAGE_INFO});
        indexPageService.getIndexPageInfo()
            .then((response) => {
                dispatch({type: indexPageActionsConstants.GET_INDEX_PAGE_INFO_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: indexPageActionsConstants.GET_INDEX_PAGE_INFO_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getLatestAnnouncements() {
    return (dispatch) => {
        dispatch({type: indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS});
        indexPageService.getLatestAnnouncements()
            .then((response) => {
                dispatch({type: indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}