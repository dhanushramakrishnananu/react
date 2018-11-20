import * as paymentService from '../../../../services/payment.es6';
import * as paymentConstants from '../../../../constants/actions/payment.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import moment from 'moment';

export function addPendingPayment(pendingPaymentData, patientId) {
    if(pendingPaymentData.ContinueFlag) {
        pendingPaymentData.ContinueFlag = 1;
    } else {
        pendingPaymentData.ContinueFlag = 0;
    }
    pendingPaymentData.ExhaustInsIDs = pendingPaymentData.ExhaustInsIDs.toString();
    return (dispatch) => {
        dispatch({type: paymentConstants.ADD_PAYMENT});
        paymentService.addPendingPayment(pendingPaymentData)
            .then(() => {
                if(pendingPaymentData.PendingPaymentID) {
                    notifications.showSuccess('Pending payments successfully edited');
                    dispatch({type: paymentConstants.SELECTED_PENDING_INVOICE, payload: {}});
                } else {
                    notifications.showSuccess('Pending payments successfully added');
                }
                patientDetailsService.getPatientDetails(patientId)
                    .then((responsePatientDetails) => {
                        dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS, payload: responsePatientDetails.data});
                    })
                    .catch((responsePatientDetails) => {
                        dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_ERROR, payload: responsePatientDetails.data});
                        notifications.showError('Something goes wrong. Please contact administrator');
                    });
            })
            .catch((response) => {
                dispatch({type: paymentConstants.ADD_PAYMENT_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getDropDownAndInitialData(patientId) {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_DROPDOWN_TYPE});
        paymentService.getDropDown()
            .then((response) => {
                dispatch({type: paymentConstants.GET_DROPDOWN_TYPE_DATA_SUCCESS, payload: response.data});
                dispatch({type: paymentConstants.GET_INITIAL_TYPE, payload: response.data});
                paymentService.getInitialData(patientId)
                    .then((initialResponse) => {
                        dispatch({type: paymentConstants.GET_INITIAL_TYPE_DATA_SUCCESS, payload: initialResponse.data});
                    })
                    .catch((catchResponse) => {
                        dispatch({type: paymentConstants.GET_INITIAL_TYPE_DATA_ERROR, payload: catchResponse});
                        notifications.showError('Something goes wrong. Please contact administrator');
                    });
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_DROPDOWN_TYPE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}