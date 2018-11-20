import * as attorneyActionsConstants from '../../../../constants/actions/attorney.es6';
import * as homeConstants from '../../../../constants/actions/home.es6';
import * as popupConstants from '../../../../constants/actions/popup.es6';
import * as attorneyService from '../../../../services/attorneyService.es6';
import * as buttonDeleteConstants from '../../../../constants/actions/buttonDelete.es6';
import notifications from '../../../../notifications.jsx';

export function editAttorney(menuName, data) {
    return (dispatch) => {
        dispatch({type: attorneyActionsConstants.EDIT_ATTORNEY, payload: data});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_ATTORNEY_EDIT, payload: menuName });
    };
}

export function closePopupDeleteAttorney() {
    return (dispatch) => {
        dispatch({type: popupConstants.CLOSE_POPUP_DELETE_ATTORNEY});
    };
}

export function showPopupDeleteAttorney() {
    return (dispatch) => {
        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
        dispatch({type: popupConstants.SHOW_POPUP_DELETE_ATTORNEY});

    };
}

export function deletePatientAttorney(attorneyId, patientId) {
    return (dispatch) => {
        attorneyService.deletePatientAttorney(attorneyId, patientId)
            .then((response) => {
                dispatch({type: attorneyActionsConstants.DELETE_PATIENT_ATTORNEY_SUCCESS, payload: response.data});
                dispatch({type: buttonDeleteConstants.HIDE_BUTTON_DELETE_ATTORNEY});
                notifications.showSuccess('Attorney successfully deleted!');
            })
            .catch((response) => {
                dispatch({type: attorneyActionsConstants.DELETE_PATIENT_ATTORNEY_ERROR, payload: response.data});
                notifications.showError('Failed to delete attorney');
            });
    };
}

