import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import * as homeConstants from '../../../../constants/actions/home.es6';

export function getDocDetails(params) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_DOC_DETAILS, payload: params});
        patientDetailsService.getDocDetails(params)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_DOC_DETAILS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_DOC_DETAILS_ERROR, payload: response.response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function resetSelectedDoc() {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.RESET_SELECTED_DOC});
    };
}

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});       
    };
}

export function deleteDoc(doc) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.DELETE_DOC, payload: doc});
        patientDetailsService.deleteDoc(doc)
        .then((response) => {
            dispatch({type: patientDetailsActionsConstants.DELETE_DOC_SUCCESS, payload: doc});
            notifications.showSuccess('Document successfully removed');
        })
        .catch((response) => {          
            notifications.showError('Something goes wrong. Please contact administrator');
        });
    };
}

export function showEditSideListMenu(menuName,data) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName}); 
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: data});      
    };
}

