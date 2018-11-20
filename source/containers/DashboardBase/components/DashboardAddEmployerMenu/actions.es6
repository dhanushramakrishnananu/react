import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';

export function searchEmployerDetails(data) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SET_SEARCH_FIELDS_QUERY, payload: data });
        dispatch({type: patientDetailsActionsConstants.SEARCH_EMPLOYER_DETAILS, payload: data });
        patientDetailsService.searchEmployerDetails(data.EmployerName)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.SEARCH_EMPLOYER_DETAILS_SUCCESS, payload: response.data});
                if(response.data.length === 0)
                    notifications.showWarning('No Record Found');
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.SEARCH_EMPLOYER_DETAILS_ERROR, payload: response});
                notifications.showError('Failed to send request for search employer details');
            });
    };
}
export function setSelectedEmployer(data) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SET_SELECTED_EMPLOYER, payload: data});
    };
}
export function insertEmployer(data,PatientId) {
    return (dispatch) => {
        patientDetailsService.insertEmployer(data.EmployerId,PatientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.INSERT_EMPLOYER_SUCCESS, payload: data});
                dispatch({type: patientDetailsActionsConstants.SHOW_BUTTON_EDIT_EMPLOYER, payload:data});
                 dispatch(onPatienRefresh(PatientId));
                notifications.showSuccess('Employer successfully added!');
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.INSERT_ATTORNEY_ERROR, payload: response});
                notifications.showError('Failed to insert employer');
            });
    };
}

export function onPatienRefresh(PatientID) {
   return (dispatch) => {
        patientDetailsService.getPatientDetails(PatientID)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS, payload: response.data});
                })
                .catch((response) => {
                    dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_ERROR, payload: response.data});
                    notifications.showError('Something goes wrong. Please contact administrator');
                }); 
    };
}
export function cleardata() {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.CLEARDATA});
    };
}