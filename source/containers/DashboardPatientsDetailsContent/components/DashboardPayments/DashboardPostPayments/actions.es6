import * as homeConstants from '../../../../../constants/actions/home.es6';
import * as paymentConstants from '../../../../../constants/actions/payment.es6';
import * as paymentService from '../../../../../services/payment.es6';
import notifications from '../../../../../notifications.jsx';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: null});
    };
}

export function showEditSideListMenu(menuName, data) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: data});
    };
}

export function selectPaymentItem(value) {
    return (dispatch) => {
        dispatch({type: paymentConstants.SELECT_PAYMENT_ITEM, payload: value});
    };
}

export function appPayment() {
    return (dispatch) => {
        dispatch({type: paymentConstants.SET_PAYMENT_FORM_DATA, payload: {}});
    };
}

export function voidTransaction(PatientId, InvoiceId) {
    return (dispatch) => {
        paymentService.voidTransaction(PatientId, InvoiceId)
            .then((response) => {
                dispatch({type: paymentConstants.VOID_TRANSACTION_SUCCESS, payload: response.data});
            })
            .catch(() => {
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}