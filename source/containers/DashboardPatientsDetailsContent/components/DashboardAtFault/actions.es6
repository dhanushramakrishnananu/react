import * as homeConstants from '../../../../constants/actions/home.es6';
import * as atFaultConstants from '../../../../constants/actions/atfault.es6';
import * as atFaultService from '../../../../services/atFault.es6';
import notifications from '../../../../notifications.jsx';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
    };
}

export function showEditSideListMenu(menuName, data) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: data});
    };
}

export function deleteAtFaultItem(value) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_DELETE_DIALOG, payload: value});
    };
}

export function editAtFaultItem(value) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: value});
    };
}

export function openDeletePopUp(atFaultID, patientID) {
    return (dispatch) => {
        atFaultService.removeAtFault(atFaultID, patientID)
            .then(() => {
                dispatch({type: atFaultConstants.ATFAULT_DELETE_ID, payload: atFaultID});
                dispatch({type: homeConstants.HIDE_DELETE_ICON, payload: null});
                dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: {}});
                notifications.showSuccess('AtFault successfully deleted!');
            })
            .catch((response) => {
                notifications.showError('Something goes wrong. Please contact administrator'+response);
            });
    };
}