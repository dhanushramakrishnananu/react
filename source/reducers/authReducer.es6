import * as authActionsConstants from '../constants/actions/auth.es6';

const initialState = {
    currentUser: {},
    signInLoading: false,
    signInError: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sign in reducer part
        case authActionsConstants.SIGN_IN:
            return {
                ...state,
                currentUser: {},
                signInLoading: true,
                signInError: null
            };
        case authActionsConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                signInLoading: false
            };
        case authActionsConstants.SIGN_IN_ERROR:
            return {
                ...state,
                signInLoading: false,
                signInError: action.payload.Message
            };
        case authActionsConstants.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
