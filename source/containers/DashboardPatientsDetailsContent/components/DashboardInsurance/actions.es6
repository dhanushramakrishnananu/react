import * as homeConstants from '../../../../constants/actions/home.es6';
import * as insuranceConstants from '../../../../constants/actions/insurance.es6';
import _ from 'lodash';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: null});
    };
}

export function showEditSideListMenu(menuName, data) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: insuranceConstants.SHOW_INSURANCE_SELECTED_STEP, payload: 3});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: data});
        dispatch({type: insuranceConstants.SET_SELECTED_INSURANCE, payload: {}});
    };
}

export function showDeleteSideListMenu(menuName, data) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU_EDIT, payload: data});
    };
}

export function selectInsuranceItem(value) {
    if(!_.isEmpty(value)) {
        value.prevInsCoverage = value.InsCoverage;
        if(_.isString(value.Status)) {
            value.prevStatus = value.Status.trim();
        }
        value.prevMainID = value.MainID;
        value.prevClaim = value.ClaimNo;
    }
    return (dispatch) => {
        dispatch({type: insuranceConstants.SELECT_INSURANCE_ITEM, payload: value});
        dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT_DATA_SUCCESS, payload: {}});
    };
}

export function selectedInsuranceItemStep(value) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SELECT_INSURANCE_ITEM, payload: value});
    };
}