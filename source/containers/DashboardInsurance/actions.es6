import * as insuranceConstants from '../../constants/actions/insurance.es6';
import * as insuranceService from '../../services/insuranceService.es6';
import * as patientDetailsService from '../../services/patientDetails.es6';

import notifications from '../../notifications.jsx';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SHOW_INSURANCE_MENU, payload: menuName});
    };
}

export function hideSideListMenu() {
    return (dispatch) => {
        dispatch({type: insuranceConstants.HIDE_INSURANCE_MENU});
    };
}

export function getTeamList() {
    return (dispatch) => {
        dispatch({type: insuranceConstants.GET_TEAM_LIST});
        insuranceService.getTeamList()
            .then((response) => {
                dispatch({type: insuranceConstants.GET_TEAM_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.GET_TEAM_LIST_ERROR, payload: response.data});
                notifications.showError('Failed to get team list');
            });
    };
}

export function getInsuranceList(teamId) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.GET_INSURANCE_LIST,payload:teamId});
        insuranceService.getInsuranceList(teamId)
            .then((response) => {
                dispatch({type: insuranceConstants.GET_INSURANCE_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.GET_INSURANCE_LIST_ERROR, payload: response.data});
                notifications.showError('Failed to get insurance list');
            });
    };
}

export function searchInputChange(searchInputValue) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SEARCH_INPUT_CHANGE, payload: searchInputValue});
    };
}

export function insertInsurance(data) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.INSERT_INSURANCE});
        patientDetailsService.insertInsurance(data)
            .then((response) => {
                dispatch({type: insuranceConstants.INSERT_INSURANCE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.INSERT_INSURANCE_ERROR, payload: response});
                notifications.showError('Failed to add insurance');
            });
    };
}

export function deleteInsurance(patientId, insId) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.DELETE_INSURANCE});
        patientDetailsService.deleteInsurance(patientId, insId)
            .then((response) => {
                dispatch({type: insuranceConstants.DELETE_INSURANCE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.DELETE_INSURANCE_ERROR, payload: response.data});
                notifications.showError('Failed to delete insurance');
            });
    };
}

export function returnInsurance(insId, returnUserInitial) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.RETURN_INSURANCE});
        patientDetailsService.returnInsurance(insId, returnUserInitial)
            .then((response) => {
                dispatch({type: insuranceConstants.RETURN_INSURANCE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.RETURN_INSURANCE_ERROR, payload: response});
                notifications.showError('Failed to return insurance');
            });
    };
}

export function searchAdjusterDetails(data) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.SEARCH_ADJUSTER_DETAILS});
        patientDetailsService.searchAdjusterDetails(data)
            .then((response) => {
                dispatch({type: insuranceConstants.SEARCH_ADJUSTER_DETAILS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.SEARCH_ADJUSTER_DETAILS_ERROR, payload: response});
                notifications.showError('Failed to send request for search adjuster details');
            });
    };
}

export function getInsuranceDocs(insId) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.GET_INSURANCE_DOCS});
        patientDetailsService.getInsuranceDocs(insId)
            .then((response) => {
                dispatch({type: insuranceConstants.GET_INSURANCE_DOCS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.GET_INSURANCE_DOCS_ERROR, payload: response});
                notifications.showError('Failed to get insurance documents');
            });
    };
}

export function insertInsuranceData(data) {
var msg='';
if(data.InsuranceMainID==0)
msg='Insurance saved successfully!';
else
msg='Insurance updated successfully!';
    return (dispatch) => {
        dispatch({type: insuranceConstants.INSERT_INSURANCE_DATA});
        insuranceService.insertInsuranceData(data)
            .then((response) => {
                dispatch({type: insuranceConstants.INSERT_INSURANCE_DATA_SUCCESS, payload: response.data});
                 notifications.showSuccess(msg);
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.INSERT_INSURANCE_DATA_ERROR, payload: response});
                notifications.showError('Failed to edit insurance');
            });
    };
}
export function selectInsuranceData(data) {
    return (dispatch) => {
       insuranceService.GetInsuranceEditDetails(data)
            .then((response) => {
                dispatch({type: insuranceConstants.SELECT_INSURANCE_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.SELECT_INSURANCE_DATA_ERROR, payload: response});
                notifications.showError('No records');
            });
    };
}

export function deleteInsurancebyID(insId) {
var msg='';
if(insId.ReplaceinsID==0)
msg='Deleted insurance successfully';
else
msg='Replaced insurance successfully';
    return (dispatch) => {
        dispatch({type: insuranceConstants.DELETE_INSURANCE});
        insuranceService.deleteInsurancebyID(insId)
            .then((response) => {
                dispatch({type: insuranceConstants.DELETE_INSURANCE_SUCCESS, payload: response.data});
             notifications.showSuccess(msg);
            })
            .catch((response) => {
                dispatch({type: insuranceConstants.DELETE_INSURANCE_ERROR, payload: response});
                notifications.showError('Failed to delete insurance');
            });
    };
}

export function selectAdjuster(data) {
    return (dispatch) => {
          dispatch({type: insuranceConstants.SELECT_INSURANCE_DATA,payload:data});
       
           
    };
}
export function getPatientDetails(insId) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.CLAIM_LIST});
        insuranceService.getPatientDetails(insId)
            .then((response) => {
                dispatch({type: insuranceConstants.CLAIM_LIST_SUCCESS, payload: response.data});

            })
            .catch((response) => {
                dispatch({type: insuranceConstants.CLAIM_LIST_ERROR, payload: response});
                notifications.showError('Failed to delete insurance');
            });
    };
}
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
export function getPatientsForDelete(data) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.PATIENT_LIST,payload:data});
        insuranceService.getPatientsForDelete(data.InsID)
            .then((response) => {
                dispatch({type: insuranceConstants.PATIENT_LIST_SUCCESS, payload: response.data});

            })
            .catch((response) => {
                dispatch({type: insuranceConstants.PATIENT_LIST_ERROR, payload: response});
               
            });
    };
}
export function getPatientDetailsForReplace(value) {
    return (dispatch) => {
        dispatch({type: insuranceConstants.PATIENT_LIST_REPLACE,payload:value});
        insuranceService.getPatientsForDelete(value.InsID)
            .then((response) => {
                dispatch({type: insuranceConstants.PATIENT_LIST_REPLACE_SUCCESS, payload: response.data});


            })
            .catch((response) => {
                dispatch({type: insuranceConstants.PATIENT_LIST_REPLACE_ERROR, payload: response});
               
            });
    };
}
export function resetData() {
    return (dispatch) => {
          dispatch({type: insuranceConstants.CLEARDATA});
       
           
    };
}
