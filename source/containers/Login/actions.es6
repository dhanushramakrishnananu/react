import browserHistory from '../../browserHistory.es6';
import cookies from '../../cookies.es6';

import * as authActionsConstants from '../../constants/actions/auth.es6';
import * as authService from '../../services/auth.es6';
import baseService from '../../services/baseService.es6';
import notifications from '../../notifications.jsx';

// Sign in actions
export function login(loginData) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_IN});
        authService.login(loginData)
            .then((response) => {
                dispatch({type: authActionsConstants.SIGN_IN_SUCCESS, payload: response.data});
                cookies.set('authToken', response.data.authToken);
                cookies.set('EmployeeId', response.data.EID);
                cookies.set('Initials', response.data.Initials);
                baseService.addAuthToken();
                browserHistory.push('/');
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.SIGN_IN_ERROR, payload: response.response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}
