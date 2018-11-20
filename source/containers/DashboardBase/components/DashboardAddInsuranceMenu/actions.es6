import _ from 'lodash';

import * as insuranceConstants from '../../../../constants/actions/insurance.es6';
import * as insuranceService from '../../../../services/insuranceService.es6';
import notifications from '../../../../notifications.jsx';

export function searchInsuranceDetails(data) {
    let dataSearch = {
        Company: data.Company || '',
        Adjuster: data.Adjuster || ''
    };
    return (dispatch) => {
        dispatch({type: insuranceConstants.SET_INSURANCE_SEARCH_FIELDS_QUERY, payload: dataSearch });
        dispatch({type: insuranceConstants.SEARCH_INSURANCE_DETAILS, payload: dataSearch });
        insuranceService.searchInsuranceDetails(dataSearch)
            .then((response) => {
                dispatch({type: insuranceConstants.SEARCH_INSURANCE_DETAILS_SUCCESS, payload: response.data});
                if(response.data.length === 0)
                    notifications.showWarning('No Record Found');
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.SEARCH_INSURANCE_DETAILS_ERROR, payload: response});
                notifications.showError('Failed to send request for search attorney details');
            });
    };
}

export function searchDetailsInitial(data) {
    const dataSearch = {
        Company: data.Company || '',
        Adjuster: data.Adjuster || ''
    };
    return (dispatch) => {
        dispatch({type: insuranceConstants.SET_INSURANCE_SEARCH_FIELDS_QUERY, payload: dataSearch});
    };
}

export function setSelectedInsurance(data) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SET_SELECTED_INSURANCE, payload: data});
    };
}

export function saveInsurance(data) {
    return (dispatch) => {
        insuranceService.saveInsurance(data)
            .then((response) => {
                data.InsID = response.data;
                dispatch({
                    type: insuranceConstants.SAVE_INSURANCE_SUCCESS,
                    payload: data
                });
                notifications.showSuccess('Insurance successfully saved!');
            })
            .catch((response) => {
                dispatch({
                    type: insuranceConstants.SAVE_INSURANCE_ERROR,
                    payload: response.data
                });
                notifications.showError('Failed to save insurance');
            });
    };
}

export function editInsurance(data, selectedStep) {
    if(!_.isString(data.TypeCoverage)) {
        const typeCoverage = _.find(data.TypeCoverage, {InsCoverageID: data.prevInsCoverage});
        data.TypeCoverage = typeCoverage.Coverage;
        data.InsCoverage = typeCoverage.InsCoverageID;
    }
    if(!_.isString(data.Status)) {
        const status = _.find(data.Status, {Status: data.prevStatus});
        data.Status = status.Status;
    }
    if('Update1' in data){
        delete data.Update1;
    }
    if(data.Verified === true) {
        data.Verified = 1;
    }
    return (dispatch) => {
        insuranceService.saveInsurance(data)
            .then((response) => {
                data.InsID = response.data;
                dispatch({
                    type: insuranceConstants.EDIT_INSURANCE_SUCCESS,
                    payload: data
                });
                if(selectedStep === 3)
                    notifications.showSuccess('Insurance successfully edited!');
                else
                    notifications.showSuccess('Insurance successfully edited and posted to grouped patients.');
                dispatch({type: insuranceConstants.SELECT_INSURANCE_ITEM, payload: {}});
                dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT_DATA_SUCCESS, payload: {}});
            })
            .catch((response) => {
                dispatch({
                    type: insuranceConstants.SAVE_INSURANCE_ERROR,
                    payload: response.data
                });
                notifications.showError('Failed to edit insurance');
            });
    };
}

export function tempSaveInsurance(data) {
    return (dispatch) => {
        insuranceService.tempSaveInsurance(data)
            .then((response) => {
                data.InsID = response.data;

                dispatch({
                    type: insuranceConstants.SAVE_INSURANCE_SUCCESS,
                    payload: data
                });
                notifications.showSuccess('Temp insurance successfully saved!');
            })
            .catch((response) => {
                dispatch({
                    type: insuranceConstants.SAVE_TEMP_INSURANCE_ERROR,
                    payload: response.data
                });
                notifications.showError('Failed to save temp insurance');
            });
    };
}

export function changeAdjuster(data) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SHOW_INSURANCE_SELECTED_STEP, payload: data});
    };
}

export function editCancel() {
    return (dispatch) => {
        dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT_DATA_SUCCESS, payload: {}});
    };
}

export function getGroupAccounts(PatientId, MainId, TypeId) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT});
        insuranceService.getGroupAccounts(PatientId, MainId, TypeId)
            .then((response) => {
                dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.GET_GROUP_ACCOUNT_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function deleteInsurance(data) {
    return (dispatch) => {
        insuranceService.deleteInsurance(data)
            .then(() => {
                dispatch({
                    type: insuranceConstants.DELETE_INSURANCE_DASHBOARD_SUCCESS,
                    payload: data
                });
                notifications.showSuccess('Insurance successfully deleted!');
                dispatch({type: insuranceConstants.SELECT_INSURANCE_ITEM, payload: {}});
            })
            .catch((response) => {
                dispatch({
                    type: insuranceConstants.DELETE_INSURANCE_DASHBOARD_ERROR,
                    payload: response.data
                });
                notifications.showError('Failed to delete insurance');
            });
    };
}