import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import { nextStep } from '../../actions.es6';
import * as homeConstants from '../../../../constants/actions/home.es6';

export function addDocument(documentData, hasNextStep) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.ADD_DOCUMENT});
        if(hasNextStep)
        {
            dispatch({type: patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS, payload: documentData.PatientID});
            dispatch(nextStep());
        }
        else
        {
            patientDetailsService.addDocument(documentData)
                .then((response) => {
                    dispatch({type: patientDetailsActionsConstants.ADD_DOCUMENT_SUCCESS, payload: response.data});                    
                    dispatch({type: patientDetailsActionsConstants.CLEAR_SELECTED_GROUP});
                    if(documentData.DocId === 0) {
                        if (hasNextStep) {
                            notifications.showSuccess('Documents successfully added,Group patients listed to post the document.');                            
                            
                        } else {
                            notifications.showSuccess('Document successfully added');
                            dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                        // window.location.reload();
                        }
                    } 
                    else
                    {
                        notifications.showSuccess('Document successfully added');
                        dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                    }    
                    if(documentData.Type === 'Correspondence' || documentData.Type === 'Denied' || documentData.Type === 'Exhausted' || documentData.Type === 'No Medpay' || documentData.Type === 'Ins Correspondance' || documentData.Type === 'EOB') {
                        dispatch(onPatienRefresh(documentData.PatientID));
                    }          
                })
                .catch((response) => {
                    dispatch({type: patientDetailsActionsConstants.ADD_DOCUMENT_ERROR, payload: response});
                    notifications.showError('Too large file to upload');
                });
        }
    };
    
}

export function onPatienRefresh(PatientID) {
   return (dispatch) => {
        patientDetailsService.getPatientDetails(PatientID)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS, payload: response.data});
                })
                .catch((response) => {
                    dispatch({type: patientDetailsActionsConstants.REFRESH_PATIENT_ERROR, payload: response.data});
                    notifications.showError('Something goes wrong. Please contact administrator');
                }); 
    };
}
export function clearSelectedGroup()
{
    return (dispatch) => {
    dispatch({type: patientDetailsActionsConstants.CLEAR_SELECTED_GROUP});
    dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
    };
}
export function getDocumentMasterData(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA});
        patientDetailsService.getDocumentMasterData(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function editDocument(data) {
    return (dispatch) => {
        //dispatch({type: patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA});
        patientDetailsService.editDoc(data)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.ADD_DOCUMENT_SUCCESS, payload: response.data});
                notifications.showSuccess('Document successfully updated.');
            })
            .catch((response) => {
                //dispatch({type: patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}