import * as paymentService from '../../../../services/payment.es6';
import * as paymentConstants from '../../../../constants/actions/payment.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import _ from 'lodash';
import {reset} from 'redux-form';

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

export function getGroupedPatients(patientId) {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_GROUPED_PATIENTS_TYPE});
        paymentService.getGroupedPatients(patientId)
            .then((response) => {
                const data =  _.filter(response.data, (value) => {
                    return value.PatientId !== patientId;
                });
                dispatch({type: paymentConstants.GET_GROUPED_PATIENTS_TYPE_DATA_SUCCESS, payload: data});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_GROUPED_PATIENTS_TYPE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getPriority(patientId, priority) {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_PAYMENT_PRIORITY});
        paymentService.getPriority(patientId, priority)
            .then((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_PRIORITY_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_PRIORITY_TYPE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getTemplates() {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_PAYMENT_TEMPLATES});
        paymentService.getTemplates()
            .then((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_TEMPLATES_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_TEMPLATES_TYPE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getReturnCode() {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_PAYMENT_RETURN_CODE});
        paymentService.getReturnCode()
            .then((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_RETURN_CODE_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_PAYMENT_RETURN_CODE_TYPE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function addPayment(paymentData, patientId) {
    paymentData.Charges = (parseFloat(paymentData.Charges) - parseFloat(paymentData.AmountPaid) - parseFloat(paymentData.Writeoff));
    paymentData.ExhaustInsIDs = paymentData.ExhaustInsIDs.toString();
    return (dispatch) => {
        dispatch({type: paymentConstants.ADD_PAYMENT});
        paymentService.addPayment(paymentData)
            .then(() => {
                patientDetailsService.getPatientDetails(patientId)
                    .then((responsePatientDetails) => {
                        dispatch(reset('addPaymentMenu'));
                        dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS, payload: responsePatientDetails.data});
                        if(paymentData.PaymentID === 0) {
                            notifications.showSuccess('Post payments successfully added');
                        } else {
                            notifications.showSuccess('Post payments successfully edited');
                            dispatch({type: paymentConstants.RESET_SELECT_PAYMENT_ITEM, payload: responsePatientDetails.data}); 
                        }
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

export function addPaymentReset() {
    return (dispatch) => {
        dispatch(reset('addPaymentMenu'));
    };
}

export function groupedInit() {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_GROUPED_PATIENTS_TYPE_DATA_SUCCESS, payload: []});
    };
}

export function addPaymentReturn(paymentReturnData, patientId) {
    return (dispatch) => {
        dispatch({type: paymentConstants.ADD_PAYMENT_RETURN});
        paymentService.addPaymentReturn(paymentReturnData)
            .then(() => {
                patientDetailsService.getPatientDetails(patientId)
                    .then((responsePatientDetails) => {
                        notifications.showSuccess('Return payments successfully added');
                        dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS, payload: responsePatientDetails.data});
                    })
                    .catch((responsePatientDetails) => {
                        dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_ERROR, payload: responsePatientDetails.data});
                        notifications.showError('Something goes wrong. Please contact administrator');
                    });
            })
            .catch((response) => {
                dispatch({type: paymentConstants.ADD_PAYMENT_RETURN_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}