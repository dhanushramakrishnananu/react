import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import * as patientConstants from '../../../../constants/actions/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import browserHistory from '../../../../browserHistory.es6';

export function updatePatientDetails(patientDetails, RefName) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.UPDATE_PATIENT_DETAILS});
        patientDetailsService.updatePatientDetails(patientDetails)
            .then(() => {
                dispatch(setRefName(RefName)); // update in header
                dispatch(setBirthDate(patientDetails.BirthDate)); // update in header
                dispatch({type: patientDetailsActionsConstants.UPDATE_PATIENT_DETAILS_SUCCESS, payload: patientDetails});
                dispatch(onPatienRefresh(patientDetails.PatientID));
                notifications.showSuccess('Patient successfully edited!');
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.UPDATE_PATIENT_DETAILS_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
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
export function setRefName(value) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SET_REF_NAME, payload: value});
    };
}

export function setBirthDate(value) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SET_BIRTHDATE, payload: value});
    };
}

export function togglePatientForm(value) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.TOGGLE_PATIENT_FORM, payload: value});
    };
}

export function getTimelyFiling(refId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_TIMELY_FILING});
        patientDetailsService.getTimelyFiling(refId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELY_FILING_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELY_FILING_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function deletePatient(patientId) {
    return (dispatch) => {
        patientDetailsService.deletePatient(patientId)
            .then((response) => {
                dispatch({type: patientConstants.DELETE_PATIENT_SUCCESS, payload: response.data});
                if(response.data.match('The DELETE statement')) {
                    notifications.showWarning('Cannot delete this Patient, Please Contact Administrator');
                  
                } else {
                    notifications.showSuccess('Patient successfully deleted!');
                    browserHistory.push('/');
                }
            })
            .catch((response) => {
                dispatch({type: patientConstants.DELETE_PATIENT_ERROR, payload: response.data});
                notifications.showError('Failed to delete Patient, Please Contact Administrator');
            });
    };
}
export function showNotesPopUpOpened(value) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SET_NOTES_POPUP_OPENED, payload: {value}});
    };
}