import * as indexPageActionsConstants from '../constants/actions/indexPage.es6';

const initialState = {
    indexPageInfo: {},
    indexPageInfoLoading: false,
    indexPageInfoError: null,
    latestAnnouncements: [],
    latestAnnouncementsLoading: false,
    latestAnnouncementsError: null
};

const indexPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case indexPageActionsConstants.GET_INDEX_PAGE_INFO:
            return {
                ...state,
                indexPageInfo: {},
                indexPageInfoLoading: true,
                indexPageInfoError: null
            };
        case indexPageActionsConstants.GET_INDEX_PAGE_INFO_SUCCESS:
            return {
                ...state,
                indexPageInfo: action.payload,
                indexPageInfoLoading: false
            };
        case indexPageActionsConstants.GET_INDEX_PAGE_INFO_ERROR:
            return {
                ...state,
                indexPageInfoLoading: false,
                indexPageInfoError: action.payload
            };
        case indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS:
            return {
                ...state,
                latestAnnouncements: [],
                latestAnnouncementsLoading: true,
                latestAnnouncementsError: null
            };
        case indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                latestAnnouncements: action.payload,
                latestAnnouncementsLoading: false
            };
        case indexPageActionsConstants.GET_LATEST_ANNOUNCEMENTS_ERROR:
            return {
                ...state,
                latestAnnouncementsLoading: false,
                latestAnnouncementsError: action.payload
            };
        default:
            return state;
    }
};

export default indexPageReducer;
