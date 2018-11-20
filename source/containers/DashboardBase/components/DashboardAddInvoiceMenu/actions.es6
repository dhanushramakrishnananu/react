import * as paymentService from '../../../../services/payment.es6';
import { HIDE_SIDE_LIST_MENU } from '../../../../constants/actions/home.es6';
import * as paymentConstants from '../../../../constants/actions/payment.es6';
import notifications from '../../../../notifications.jsx';

export function addInvoice(value) {
    return (dispatch) => {
        dispatch({type: paymentConstants.ADD_INVOICE});
        paymentService.addInvoice(value)
            .then((response) => {
                dispatch({type: paymentConstants.ADD_INVOICE_SUCCESS, payload: response});
                notifications.showSuccess('Payments successfully added to existing invoice');
                dispatch({type: HIDE_SIDE_LIST_MENU});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.ADD_INVOICE_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getInvoice(RefId) {
    return (dispatch) => {
        dispatch({type: paymentConstants.GET_INVOICE});
        paymentService.getInvoice(RefId)
            .then((response) => {
                dispatch({type: paymentConstants.GET_INVOICE_DATA_SUCCESS, payload: response.data});                
            })
            .catch((response) => {
                dispatch({type: paymentConstants.GET_INVOICE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function selectedInvoice(value) {
    return (dispatch) => {
        dispatch({type: paymentConstants.SELECTED_INVOICE, payload: value});
    };
}

export function editInvoice(value) {
    return (dispatch) => {
        dispatch({type: paymentConstants.EDIT_INVOICE});
        paymentService.editInvoice(value)
            .then(() => {
                dispatch({type: paymentConstants.EDIT_INVOICE_SUCCESS, payload: value});
                dispatch({type: paymentConstants.SELECT_PAYMENT_ITEM, payload: {}});
                notifications.showSuccess('Invoice successfully edited');
                dispatch({type: HIDE_SIDE_LIST_MENU});
            })
            .catch((response) => {
                dispatch({type: paymentConstants.EDIT_INVOICE_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}