import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';

export function getGroupAccountDetails(PatientId,groupacct) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS, payload: {
            PatientName: groupacct.PatientName
        }});
        patientDetailsService.getGroupAccountDetails(PatientId,groupacct.PatientName)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.SET_SELECTED_MAIN_GROUPED_PATIENT, payload: {
                    data: response.data,
                    groupacct: groupacct
                }});
                dispatch({type: patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS_SUCCESS, payload: {
                    data: response.data,
                    PatientName: groupacct.PatientName
                }});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS_ERROR, payload: {
                    error: response,
                    PatientName: groupacct.PatientName
                }});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}