import * as homeConstants from '../../../../constants/actions/home.es6';
import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';

export function showEditSideListMenu(menuName, data) {
    return (dispatch) => {
    
  		dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
	
        setTimeout(() => {dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});}, 500)
        dispatch({type: homeConstants.SHOW_SIDE_LIST_INDICATOR_MENU_EDIT, payload: data});
    };
}

export function selectIndicatorItem(value) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_INDICATOR_MENU_EDIT, payload: value});
    };
}

export function deleteIndicator(IndicatorId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.DELETE_INDICATOR, payload: IndicatorId});
        patientDetailsService.deleteIndicator(IndicatorId)
        .then((response) => {
            dispatch({type: patientDetailsActionsConstants.DELETE_INDICATOR_SUCCESS, payload: IndicatorId});
            dispatch({type: homeConstants.SELECTED_INDICATOR_CLEAR});
            notifications.showSuccess('Indicator successfully removed');
        })
        .catch((response) => {          
            notifications.showError('Something goes wrong. Please contact administrator');
        });
    };
}