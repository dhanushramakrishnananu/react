import * as authActionsConstants from '../../constants/actions/auth.es6';
import * as baseActionsConstants from '../../constants/actions/base.es6';
import * as patientDetailsActionsConstants from '../../constants/actions/patientDetails.es6';
import * as buttonDeleteConstants from '../../constants/actions/buttonDelete.es6';
import * as homeConstants from '../../constants/actions/home.es6';
import * as patientDetailsService from '../../services/patientDetails.es6';
import * as authService from '../../services/auth.es6';
import browserHistory from '../../browserHistory.es6';
import urls from '../../urls.es6';
import notifications from '../../notifications.jsx';

export function getPatientDetails(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS});
        patientDetailsService.getPatientDetails(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS_SUCCESS, payload: response.data});
                dispatch({type: buttonDeleteConstants.SHOW_BUTTON_DELETE_ATTORNEY, payload: response.data.PatientNotesDocsModel.PatientAtty});
                dispatch({type: patientDetailsActionsConstants.SHOW_BUTTON_EDIT_EMPLOYER, payload: response.data.PatientNotesDocsModel.EmployerInfo});
                dispatch({type: patientDetailsActionsConstants.SET_NOTES_POPUP_OPENED, payload: false});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS_ERROR, payload: response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}
export function getGroupedPatientDetails(patientId) {
    return (dispatch) => {
        patientDetailsService.getPatientDetails(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS_SUCCESS, payload: response.data});
                dispatch({type: buttonDeleteConstants.SHOW_BUTTON_DELETE_ATTORNEY, payload: response.data.PatientNotesDocsModel.PatientAtty});
                dispatch({type: patientDetailsActionsConstants.SHOW_BUTTON_EDIT_EMPLOYER, payload: response.data.PatientNotesDocsModel.EmployerInfo});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS_ERROR, payload: response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getCurrentUser() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.GET_CURRENT_USER});
        authService.getCurrentUser()
            .then((response) => {
                dispatch({type: authActionsConstants.GET_CURRENT_USER_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.GET_CURRENT_USER_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
    };
}

export function hideSideListMenu() {
    return (dispatch) => {
        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
    };
}

export function nextStep() {
    return (dispatch) => {
        dispatch({type: homeConstants.NEXT_STEP});
    };
}

export function prevStep() {
    return (dispatch) => {
        dispatch({type: homeConstants.PREV_STEP});
    };
}

export function searchPatient(searchValue) {
    return (dispatch) => {
        dispatch({type: baseActionsConstants.SEARCH_PATIENT});
        patientDetailsService.getPatientDetails(searchValue)
            .then((response) => {
             dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                dispatch({type: baseActionsConstants.SEARCH_PATIENT_SUCCESS, payload: response.data});
                browserHistory.push(urls.patientDetails.replace(':patientId', searchValue));
            })
            .catch((response) => {
                dispatch({type: baseActionsConstants.SEARCH_PATIENT_ERROR, payload: response.data});
                notifications.showError('Patient Record not found');
            });
    };
}