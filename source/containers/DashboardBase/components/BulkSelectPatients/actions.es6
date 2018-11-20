import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';

export function getGroupedPatients(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_GROUPED_PATIENTS});
        patientDetailsService.getGroupedPatients(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_GROUPED_PATIENTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_GROUPED_PATIENTS_ERROR, payload: response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function selectAllPatients(type) {
    return (dispatch) => {
        if(type==='Edit Note'){
            dispatch({type: patientDetailsActionsConstants.SELECT_ALL_NOTES_GROUPED_PATIENTS});
        } else if(type === 'Edit Attorney') {
            dispatch({type: patientDetailsActionsConstants.SELECT_ALL_ATTORNEY_GROUPED_PATIENTS});
        } else{
            dispatch({type: patientDetailsActionsConstants.SELECT_ALL_GROUPED_PATIENTS});
        }
    };
}

export function selectGroupedPatient(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SELECT_GROUPED_PATIENT, payload: patientId});
    };
}

export function selectCurrentPatientAccount(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SELECT_CURRENT_PATIENT_IN_GROUPED, payload: patientId});
    };
}