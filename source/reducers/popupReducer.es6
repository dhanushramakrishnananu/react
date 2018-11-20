import _ from 'lodash';
import * as popupConstants from "../constants/actions/popup.es6";

const initialState = {
    showPopupDeleteAttorney: false
};

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case popupConstants.CLOSE_POPUP_DELETE_ATTORNEY:
            return {
                ...state,
                showPopupDeleteAttorney: false
            };
        case popupConstants.SHOW_POPUP_DELETE_ATTORNEY:
            return {
                ...state,
                showPopupDeleteAttorney: true
            };
        default:
            return state;
    }
};

export default popupReducer;
