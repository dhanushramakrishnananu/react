import * as atFaultActionsConstants from '../../../../constants/actions/atfault.es6';
import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as atFaultService from '../../../../services/atFault.es6';
import * as homeConstants from '../../../../constants/actions/home.es6';
import notifications from '../../../../notifications.jsx';
import { nextStep } from '../../actions.es6';
import _ from 'lodash';

export function getStateData() {
    return (dispatch) => {
        dispatch({type: atFaultActionsConstants.GET_ATFAULT_STATE});
        atFaultService.getState()
            .then((response) => {
                dispatch({type: atFaultActionsConstants.GET_ATFAULT_STATE_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: atFaultActionsConstants.GET_ATFAULT_STATE_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function addAtFault(atFaultData,hasNextStep) {
    return (dispatch) => {
        dispatch({type: atFaultActionsConstants.ADD_ALFAULT});
        atFaultService.addAtFault(atFaultData)
            .then((response) => {
                dispatch({type: atFaultActionsConstants.ADD_ALFAULT_SUCCESS, payload: response.data});
                if(atFaultData.AtFaultID === 0) {
                    if (hasNextStep) {
                        let atfaultid=response.data[response.data.length-1].AtFaultID;
                        dispatch({type: atFaultActionsConstants.SET_ALFAULT_NEWID, payload: atfaultid});
                        dispatch({type: patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS, payload: atFaultData.PatientID});
                        dispatch(nextStep());
                        notifications.showSuccess('AtFault successfully added, Group patients listed to post the AtFault.');                         
                    } else {
                        notifications.showSuccess('AtFault successfully added');
                        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                    }
                    //notifications.showSuccess('AtFault successfully added');
                } else {
                    if (Boolean(hasNextStep)) {
                        const updateData = _.filter(response.data, (value) => {
                            return value.AtFaultID === atFaultData.AtFaultID;
                        });
                        dispatch({type: atFaultActionsConstants.SET_ALFAULT_NEWID, payload: atFaultData.AtFaultID});
                        dispatch({type: patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS, payload: atFaultData.PatientID});
                        dispatch({type: homeConstants.UPDATE_ATFAULT_LIST_MENU_EDIT, payload: updateData[0]});
                        dispatch({type: homeConstants.SHOW_DELETE_DIALOG, payload: updateData[0]});
                        dispatch(nextStep()); 
                        notifications.showSuccess('AtFault successfully edited, Group patients listed to post the edited Atfault.');
                    } else {
                        notifications.showSuccess('AtFault successfully edited');
                        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                    }                    
                   
                    //dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                   // notifications.showSuccess('AtFault successfully edited');
                }
              
            })
            .catch((response) => {
                dispatch({type: atFaultActionsConstants.ADD_ALFAULT_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function insertPostToGroup(data,isEdit) {
    return (dispatch) => {
        dispatch({type: atFaultActionsConstants.ADD_POSTTOGROUP_ALFAULT});
        atFaultService.postToGroup(data)
            .then((response) => {
                dispatch({type: atFaultActionsConstants.ADD_POSTTOGROUP_ALFAULT_SUCCESS, payload: response.data});
                dispatch({type: patientDetailsActionsConstants.CLEAR_SELECTED_GROUP});
                if(!isEdit){
                    notifications.showSuccess('AtFault successfully added and posted to grouped patients.');  
                } else {
                    notifications.showSuccess('AtFault successfully edited and posted to grouped patients.');
                }              
                dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
            })
            .catch((response) => {
                dispatch({type: atFaultActionsConstants.ADD_POSTTOGROUP_ALFAULT_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}