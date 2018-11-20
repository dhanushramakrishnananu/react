import * as authActionsConstants from '../../../../constants/actions/auth.es6';
import * as HomeConstants from '../../../../constants/actions/home.es6';
import * as authService from '../../../../services/auth.es6';
import baseService from '../../../../services/baseService.es6';
import browserHistory from '../../../../browserHistory.es6';
import notifications from '../../../../notifications.jsx';

export function logout() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.LOGOUT});
        authService.logout()
            .then((response) => {
                dispatch({type: authActionsConstants.LOGOUT_SUCCESS, payload: response.data});
                dispatch({type: HomeConstants.HIDE_SIDE_LIST_MENU});
                baseService.removeAuthToken();
                browserHistory.push('/');
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.LOGOUT_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}