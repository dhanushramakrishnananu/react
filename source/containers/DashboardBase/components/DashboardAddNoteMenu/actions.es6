import * as patientDetailsActionsConstants from '../../../../constants/actions/patientDetails.es6';
import notifications from '../../../../notifications.jsx';
import * as homeConstants from '../../../../constants/actions/home.es6';
import * as patientDetailsService from '../../../../services/patientDetails.es6';
import { nextStep } from '../../actions.es6';

export function getMasterDataForNote(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_NOTES_MASTER_DATA});
        patientDetailsService.getMasterDataForNote(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_NOTES_MASTER_DATA_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_NOTES_MASTER_DATA_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function addNote(noteData,hasNextStep,status) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.ADD_NOTE});
        patientDetailsService.addNote(noteData,status)
            .then((response) => {
                if(response.data.indexOf("NoteID")>-1) {
                    var result = response.data.split(':');
                    var NoteID = parseInt(result[1]);
                    dispatch({type: patientDetailsActionsConstants.ADD_NOTE_SUCCESS, payload: NoteID});
                    dispatch(onPatienRefresh(noteData.PatientID));
                    if(noteData.NoteId === 0) {
                        if (hasNextStep) {
                            dispatch({type: patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS, payload: noteData.PatientID});
                            dispatch(nextStep());
                            notifications.showSuccess('Note successfully added, Group patients listed to post the note.');                         
                        } else {
                            notifications.showSuccess('Note successfully added');
                            dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                        }
                    }
                    else
                    {                    
                        if (Boolean(hasNextStep)) {
                            dispatch(nextStep()); 
                            notifications.showSuccess('Note successfully edited, Group patients listed to post the edited note.');
                        } else {
                            notifications.showSuccess('Note successfully edited');
                            dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
                        }                                               
                    }
                } else if(response.data.indexOf("NoteStatus")>-1) {
                    var result = response.data.split(':');
                    var NoteStatus = parseInt(result[1]);
                    if(NoteStatus <= 1) {
                        dispatch({type: patientDetailsActionsConstants.SHOW_EDIT_NOTE_OPEN_NOTES_MESSAGE});  
                    }
                }
                })
                .catch((response) => {
                    dispatch({type: patientDetailsActionsConstants.ADD_NOTE_ERROR, payload: response});
                    notifications.showError('Something goes wrong. Please contact administrator');
                });
    };
}
export function getGroupedPatientsForNotesPostToGroup(NoteID,PatientID) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_NOTES_GROUPED_PATIENTS});
            patientDetailsService.onGetNotesGroupedPatients(NoteID,PatientID)
                .then((notesResponse) => {
                    dispatch({type: patientDetailsActionsConstants.GET_NOTES_GROUPED_PATIENTS_SUCCESS, payload: notesResponse.data});
                })              
                .catch((notesResponse) => {
                    dispatch({type: patientDetailsActionsConstants.GET_NOTES_GROUPED_PATIENTS_ERROR, payload: notesResponse.data});
                    notifications.showError('Something goes wrong. Please contact administrator');
                });
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
export function insertPostToNote(data,patientId,isEdit) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.INSERT_POST_TO_NOTE});
        patientDetailsService.insertPostToNote(data)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.INSERT_POST_TO_NOTE_SUCCESS, payload: response.data});
                if(!isEdit){
                    notifications.showSuccess('Note successfully added and posted to grouped patients.');  
                } else {
                    notifications.showSuccess('Note successfully edited and posted to grouped patients.');
                }              
                dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.INSERT_POST_TO_NOTE_ERROR, payload: response});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}
export function hideEditNoteOpenNoteMessage() {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.HIDE_EDIT_NOTE_OPEN_NOTES_MESSAGE});
    };
}