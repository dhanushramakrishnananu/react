import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';

export function editAgedAccount(data) {
    return (dispatch) => {
        patientDetailsService.editAgedAccount(data)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.EDIT_AGEDACCOUNT_SUCCESS, payload: data});
                notifications.showSuccess('Aged account successfully edited');
            })
            .catch((response) => {               
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}