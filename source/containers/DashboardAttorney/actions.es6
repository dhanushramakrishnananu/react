import * as attorneyConstants from '../../constants/actions/attorney.es6';
import * as buttonDeleteConstants from '../../constants/actions/buttonDelete.es6';
import * as attorneyService from '../../services/attorneyService.es6';
import notifications from '../../notifications.jsx';
import * as insuranceConstants from '../../constants/actions/insurance.es6';
import * as insuranceService from '../../services/insuranceService.es6';
import * as atFaultActionsConstants from '../../constants/actions/atfault.es6';
import * as atFaultService from '../../services/atFault.es6';



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

export function getAttorneyList(data)
{
    return (dispatch) => {
        dispatch({type: attorneyConstants.GET_ATTORNEY_LIST});
        attorneyService.getAttorneyList(data)
            .then((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_LIST_ERROR, payload: response.data});
                notifications.showError('Failed to get Attorney list');
            });
    };
}

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: attorneyConstants.SHOW_ATTORNEY_MENU, payload: menuName});
    };
}

export function hideSideListMenu() {
    return (dispatch) => {
        dispatch({type: attorneyConstants.HIDE_ATTORNEY_MENU});
    };
}

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

export function saveAttorney(data,search) {
    return (dispatch) => {
        dispatch({type: attorneyConstants.GET_ATTORNEY_LIST});
        attorneyService.saveAttorney(data)
            .then((response) => {
                if(search)
                {                 
                   // dispatch({type: attorneyConstants.GET_ATTORNEY_LIST});
                    attorneyService.getAttorneyList(search)
                        .then((response) => {
                            dispatch({type: attorneyConstants.GET_ATTORNEY_LIST_SUCCESS, payload: response.data});
                            notifications.showSuccess('Attorney successfully saved!');
                        })
                        .catch((response) => {
                            dispatch({type: attorneyConstants.GET_ATTORNEY_LIST_ERROR, payload: response.data});
                            notifications.showError('Failed to get Attorney list');
                        });
                   
                }
                else
                {
                    dispatch({type: attorneyConstants.ADD_ATTORNEY_MENU_SUCCESS, payload: response.data});
                    notifications.showSuccess('Attorney successfully saved!');
                }
               
                hideSideListMenu();
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.ADD_ATTORNEY_MENU_ERROR, payload: response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function selectAttorney(data){
    return (dispatch) => {
        dispatch({type: attorneyConstants.SET_ATTORNEY, payload:data});
        dispatch({type: attorneyConstants.HIDE_ATTORNEY_MENU});
    }
}

export function GetPatientsByAttorney(data)
{
    return (dispatch) => {
        dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST});
        attorneyService.GetPatientsByAttorney(data)
            .then((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST_ERROR, payload: response.data});
                notifications.showError('Failed to get patients list by Attorney');
            });
    };
}


export function deleteAttorney(id,rid)
{
    return (dispatch) => {
        //dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST});
        attorneyService.deleteAttorney(id,rid)
            .then((response) => {
                if(rid>0)
                {
                    notifications.showSuccess('Attorney successfully deleted and replaced !');
                }
                else
                {
                    notifications.showSuccess('Attorney successfully deleted!');
                }
                dispatch({type: attorneyConstants.HIDE_ATTORNEY_MENU});
               // dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
               // dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENT_LIST_ERROR, payload: response.data});
                notifications.showError('Failed to get patients list by Attorney');
            });
    };
}

export function GetPatientsbyAttorneyID(Attorneyid)
{
    return (dispatch) => {
        dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENTS_LIST_BYID});
        attorneyService.GetPatientsbyAttorneyID(Attorneyid)
            .then((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENTS_LIST_BYID_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: attorneyConstants.GET_ATTORNEY_PATIENTS_LIST_BYID_ERROR, payload: response.data});
                notifications.showError('Failed to get patients list by Attorney');
            });
    };
}