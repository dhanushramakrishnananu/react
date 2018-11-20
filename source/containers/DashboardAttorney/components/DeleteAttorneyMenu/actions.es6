import * as attorneyConstants from '../../../../constants/actions/attorney.es6';
import * as homeConstants from '../../../../constants/actions/home.es6';
import * as popupConstants from '../../../../constants/actions/popup.es6';
import * as attorneyService from '../../../../services/attorneyService.es6';
import * as buttonDeleteConstants from '../../../../constants/actions/buttonDelete.es6';
import notifications from '../../../../notifications.jsx';
import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import { nextStep } from '../../actions.es6'

export function searchAttorneyDetails(data) {
    let dataSearch = {
        FirstName: data.FirstName || '',
        LastName: data.LastName || '',
        Firm: data.Firm || ''
    };

    return (dispatch) => {
        dispatch({type: attorneyConstants.SET_SEARCH_FIELDS_QUERY, payload: dataSearch });
        dispatch({type: attorneyConstants.SEARCH_ATTORNEY_DETAILS, payload: dataSearch });
        attorneyService.searchAttorneyDetails(dataSearch)
            .then((response) => {                
                dispatch({type: attorneyConstants.SEARCH_ATTORNEY_DETAILS_SUCCESS, payload: response.data});
                if(response.data.length === 0)
                    notifications.showWarning('No Record Found');

            })
            .catch((response) => {
                dispatch({type: attorneyConstants.SEARCH_ATTORNEY_DETAILS_ERROR, payload: response});
                notifications.showError('Failed to send request for search attorney details');
            });
    };
}

export function setSelectedAttorney(data) {
    return (dispatch) => {
        dispatch({type: attorneyConstants.SET_SELECTED_ATTORNEY, payload: data});
    };
}
export function setConfirmAttorney(data) {
    return (dispatch) => {
        dispatch({type: attorneyConstants.SET_SELECTED_CONFIRM_ATTORNEY, payload: data});
    };
}

export function cleardata() {
    return (dispatch) => {
        dispatch({type: attorneyConstants.CLEARDATA});
        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
    };
}

export function insertAttorney(data,hasNextStep) {
    data.Attention = data.Attention || '';
    data.LOP = data.LOP || '';
    data.Correspondance = data.Correspondance || '';
    data.IsVerified = data.IsVerified || '';
    data.UpdateFlag = false;

    return (dispatch) => {
        attorneyService.insertAttorney(data)
            .then((response) => {
                dispatch({type: attorneyConstants.INSERT_ATTORNEY_SUCCESS,
                    payload: response.data.response});
                dispatch({type: buttonDeleteConstants.SHOW_BUTTON_DELETE_ATTORNEY, payload: response.data.response});
                if (hasNextStep) {
                    dispatch({type: patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS, payload: data.PatientID});
                    dispatch(nextStep());
                    notifications.showSuccess('Attorney successfully added, Group patients listed to post the attorney.');                         
                } else {
                    notifications.showSuccess('Attorney successfully added!');
                    dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                }
            })
            .catch((response) => {
                dispatch({
                    type: attorneyConstants.INSERT_ATTORNEY_ERROR,
                    payload: response.data
                });
                notifications.showError('Failed to insert attorney');
            });
    };
}

export function updateAttorneyByPatientID(data,hasNextStep) {
    data.UpdateFlag = false;

    return (dispatch) => {
        attorneyService.updateAttorneyByPatientID(data, data.PatientID)
            .then((response) => {
                dispatch({
                    type: attorneyConstants.INSERT_ATTORNEY_SUCCESS,
                    payload: response.data.response
                });
                dispatch({type: attorneyConstants.UPDATE_ATTORNEY_BY_PATIENT_ID_SUCCESS, payload: response.data});
                dispatch({type: buttonDeleteConstants.SHOW_BUTTON_DELETE_ATTORNEY, payload: response.data.response});
                if (hasNextStep) {
                    dispatch(nextStep());
                    notifications.showSuccess('Attorney successfully edited, Group patients listed to post the attorney.');                         
                } else {
                    notifications.showSuccess('Attorney successfully updated!');
                    dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                }
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.UPDATE_ATTORNEY_BY_PATIENT_ID_ERROR, payload: response.data});
                notifications.showError('Failed to edit attorney');
            });
    };
}


export function getAttorneyDocs(attorneyId, patientId) {
    return (dispatch) => {
        attorneyService.getAttorneyDocs(attorneyId, patientId)
            .then((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_DOCS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_DOCS_ERROR, payload: response.data});
                notifications.showError('Failed to get attorney documents');
            });
    };
}

export function insertDocumentSession(docId, sessionId) {
    return (dispatch) => {
        attorneyService.insertDocumentSession(docId, sessionId)
            .then((response) => {
                dispatch({type: attorneyConstants.INSERT_DOCUMENT_SESSION_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.INSERT_DOCUMENT_SESSION_ERROR, payload: response.data});
                notifications.showError('Failed to add document session');
            });
    };
}

export function getAttorneyPostGroup(patientId, attorneyId) {
    return (dispatch) => {
        attorneyService.getAttorneyPostGroup(patientId, attorneyId)
            .then((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_POST_GROUP_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_POST_GROUP_ERROR, payload: response.data});
                notifications.showError('Failed to get attorney post group');
            });
    };
}

export function postToGroupAttorney(data,isEdit) {
    return (dispatch) => {
        attorneyService.postToGroupAttorney(data)
            .then((response) => {             
                 if(!isEdit){
                    notifications.showSuccess('Attorney successfully added and posted to grouped patients.');  
                } else {
                    notifications.showSuccess('Attorney successfully edited and posted to grouped patients.');
                }              
                dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                dispatch({type: patientDetailsActionsConstants.CLEAR_SELECTED_GROUP});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.POST_TO_GROUP_ATTORNEY_ERROR, payload: response.data});
                notifications.showError('Failed to send post to group attorney');
            });
    };
}

export function changeAdjuster(data) {
    return (dispatch) => {
        dispatch({type: attorneyConstants.SHOW_ATTORNEY_SELECTED_STEP, payload: data});
    };
}