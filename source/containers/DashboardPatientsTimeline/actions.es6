import * as patientDetailsActionsConstants from '../../constants/actions/patientDetails.es6';
import * as patientDetailsService from '../../services/patientDetails.es6';
import notifications from '../../notifications.jsx';


export function getTimeline(patientId) {
    return (dispatch) => {
        dispatch({type: patientDetailsActionsConstants.GET_TIMELINE});
        patientDetailsService.getTimeline(patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELINE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_PATIENT_DETAILS_ERROR, payload: response.response.data});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getTimelineItemData(actionId, relatedActionId, patientId) {
    return (dispatch) => {
        dispatch({
            type: patientDetailsActionsConstants.GET_TIMELINE_ITEM_DETAIL,
            payload: {
                RelatedActionID: relatedActionId,
                ActionID: actionId
            }
        });
        patientDetailsService.getTimelineItemData(actionId, relatedActionId, patientId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELINE_ITEM_DETAIL_SUCCESS, payload: {
                    response: response,
                    itemIds: {
                        RelatedActionID: relatedActionId,
                        ActionID: actionId
                    }
                }});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELINE_ITEM_DETAIL_ERROR, payload: {
                    response: response,
                    itemIds: {
                        RelatedActionID: relatedActionId,
                        ActionID: actionId
                    }
                }});
                notifications.showError('Something goes wrong. Please contact administrator');
            });
    };
}

export function getTimelineHistory(actionId, relatedActionId) {
    return (dispatch) => {
        dispatch({
            type: patientDetailsActionsConstants.GET_TIMELINE_HISTORY,
            payload: {
                RelatedActionID: relatedActionId,
                ActionID: actionId
            }
        });
        patientDetailsService.getTimelineItemData(actionId, relatedActionId)
            .then((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELINE_HISTORY_SUCCESS, payload: {
                    response: response,
                    itemIds: {
                        RelatedActionID: relatedActionId,
                        ActionID: actionId
                    }
                }});
            })
            .catch((response) => {
                dispatch({type: patientDetailsActionsConstants.GET_TIMELINE_HISTORY_ERROR, payload: {
                    response: response,
                    itemIds: {
                        RelatedActionID: relatedActionId,
                        ActionID: actionId
                    }
                }});
            });
    };
}