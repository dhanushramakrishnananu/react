import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import * as homeConstants from '../../../../constants/actions/home.es6';


export function getPatientDropDownData() {
    return (dispatch) => {       
        dispatch({type: patientDetailsActionsConstants.GET_INDICATOR_TYPE});
        patientDetailsService.getPatientDropDownData()
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_INDICATOR_TYPE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_INDICATOR_TYPE_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function updateIndicator(data,isEdit) {
    return (dispatch) => {       
        dispatch({type: patientDetailsActionsConstants.ADD_INDICATOR_PATIENT});
        patientDetailsService.updateIndicator(data)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.ADD_INDICATOR_PATIENT_SUCCESS, payload: response.data});
                if(isEdit) {
                    notifications.showSuccess('Indicator successfully edited! ');
                } else {
                    notifications.showSuccess('Indicator successfully saved! ');
                }
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.ADD_INDICATOR_PATIENT_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

