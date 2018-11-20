import * as patientDetailsActionsConstants from '../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../services/patientDetails.es6';
import notifications from '../../notifications.jsx';
import browserHistory from '../../browserHistory.es6';
import urls from '../../urls.es6';
import * as homeConstants from '../../constants/actions/home.es6';

export function getPatientDetails(PatientID) {
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
export function getMasterDataForPatient() {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_PATIENT_MASTER_DATA});
        patientDetailsService.getMasterDataForPatient()
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_MASTER_DATA_SUCCESS, payload: response.data});
                dispatch(getTimelyFiling(response.data.ReferredBy[0].RefID));
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_MASTER_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
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

export function saveNewPatient(data) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.SAVE_PATIENT_DATA});
        patientDetailsService.saveNewPatient(data)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.SAVE_PATIENT_DATA_SUCCESS, payload: response.data});
                dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                notifications.showSuccess('Patient successfully added');
                browserHistory.push(urls.patientDetails.replace(':patientId', response.data));
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.SAVE_PATIENT_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}