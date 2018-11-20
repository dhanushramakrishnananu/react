import * as searchPatientActionsConstants from '../constants/actions/base.es6';

const initialState = {
    searchPatientLoading: false,
    searchPatientError: null
};

const baseReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchPatientActionsConstants.SEARCH_PATIENT:
            return {
                ...state,
                searchPatientLoading: true,
                searchPatientError: null
            };
        case searchPatientActionsConstants.SEARCH_PATIENT_SUCCESS:
            return {
                ...state,
                searchPatientLoading: false
            };
        case searchPatientActionsConstants.SEARCH_PATIENT_ERROR:
            return {
                ...state,
                searchPatientLoading: false,
                searchPatientError: action.payload
            };
        default:
            return state;
    }
};

export default baseReducer;
