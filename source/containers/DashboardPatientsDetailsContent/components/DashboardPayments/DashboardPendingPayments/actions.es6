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
        dispatch({type: paymentConstants.SELECTED_PENDING_INVOICE, payload: value});
    };
}

export function deletePendingPayment(value) {
    return (dispatch) => {
        paymentService.deletePendingPayment(value)
            .then(() => {
                notifications.showSuccess('Pending payments successfully deleted');
                dispatch({type: paymentConstants.DELETE_PENDING_PAYMENT_SUCCESS, payload: value});
                dispatch({type: paymentConstants.RESET_SELECTED_PAYMENT, payload: value});
            });
    };
}