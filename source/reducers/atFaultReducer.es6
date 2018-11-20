import * as atFaultConstants from '../constants/actions/atfault.es6';

const initialState = {
    atFaultStateData: [],
    atFaultLoading: false,
    atFaultError: null,
    atFaultData: [],
    newAtFaultId:null
};

const atFaultReducer = (state = initialState, action) => {
    switch (action.type) {
        case atFaultConstants.GET_ATFAULT_STATE:
            return {
                ...state,
                atFaultLoading: true,
                atFaultError: null
            };
        case atFaultConstants.GET_ATFAULT_STATE_DATA_SUCCESS:
            return {
                ...state,
                atFaultStateData: action.payload,
                atFaultLoading: false
            };
        case atFaultConstants.GET_ATFAULT_STATE_DATA_ERROR:
            return {
                ...state,
                atFaultLoading: false,
                atFaultError: action.payload
            };
        case atFaultConstants.ADD_ALFAULT_ERROR:
            return {
                ...state,
                atFaultLoading: true,
                atFaultError: action.payload
            };
        case atFaultConstants.SET_ALFAULT_NEWID:
            return {
                ...state,
                newAtFaultId : action.payload
        };
        default:
            return state;
    }
};

export default atFaultReducer;
