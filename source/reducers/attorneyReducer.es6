import * as attorneyConstants from '../constants/actions/attorney.es6';
import * as buttonDeleteConstants from '../constants/actions/buttonDelete.es6';

const initialState = {
    attorneyListLoading: false,
    attorneyList: [],
    sideListMenu: null,
    showButtonDelete: false,
    updateFlag: false,
    selectedAttorney: {},
    searchFields: {},
    attorneyMainList:[],
    attorneyMainListLoading:false,
    selectMainAttorney:null ,
    PatientList:[],
    selectedConfirmAttorney:{},
    PatientsByAttorneyID:[]
};

const attorneyReducer = (state = initialState, action) => {
    switch(action.type) {
        case attorneyConstants.SET_SEARCH_FIELDS_QUERY:
            return {
                ...state,
                searchFields: action.payload
            };
        case attorneyConstants.EDIT_ATTORNEY:
            return {
                ...state,
                updateFlag: true,
                attorneyList: [],
                selectedAttorney: action.payload
            };
        case attorneyConstants.SEARCH_ATTORNEY_DETAILS:
            return {
                ...state,
                attorneyList: [],
                attorneyListLoading: true
            };
        case attorneyConstants.SEARCH_ATTORNEY_DETAILS_SUCCESS:
            return {
                ...state,
                attorneyListLoading: false,
                attorneyList: action.payload
            };
        case attorneyConstants.SET_SELECTED_ATTORNEY:
            return {
                ...state,
                selectedAttorney: action.payload
            };
        case buttonDeleteConstants.HIDE_BUTTON_DELETE_ATTORNEY:
            return {
                ...state,
                showButtonDelete: false
            };
        case buttonDeleteConstants.SHOW_BUTTON_DELETE_ATTORNEY:
            const attorney = action.payload;
            var showButtonDelete = false;
            if ( _.isObject(attorney) ) {
                if ( attorney.AttorneyID ) {
                    showButtonDelete = true;
                }
            }
            return {
                ...state,
                showButtonDelete: showButtonDelete
            };
        case attorneyConstants.SEARCH_ATTORNEY_DETAILS_ERROR:
            return {};
        case attorneyConstants.UPDATE_ATTORNEY_BY_PATIENT_ID_SUCCESS:
            return {
                ...state,
                searchFields: {},
                selectedAttorney: {}
            };
        case attorneyConstants.UPDATE_ATTORNEY_BY_PATIENT_ID_ERROR:
            return {};
        case attorneyConstants.INSERT_ATTORNEY_SUCCESS:
            return {
                ...state,
                searchFields: {},
                selectedAttorney: {}
            };
        case attorneyConstants.INSERT_ATTORNEY_ERROR:
            return {};
        case attorneyConstants.GET_ATTORNEY_DOCS_SUCCESS:
            return {};
        case attorneyConstants.GET_ATTORNEY_DOCS_ERROR:
            return {};
        case attorneyConstants.INSERT_DOCUMENT_SESSION_SUCCESS:
            return {};
        case attorneyConstants.INSERT_DOCUMENT_SESSION_ERROR:
            return {};        
        case attorneyConstants.GET_ATTORNEY_POST_GROUP_ERROR:
            return {};
        case attorneyConstants.CLEARDATA:
            return {
                ...state,
                searchFields: {},
                attorneyList: [],
                PatientsByAttorneyID:[],
                selectedConfirmAttorney:{},
                selectedAttorney:{}

            };
        case attorneyConstants.GET_ATTORNEY_LIST_SUCCESS:
            return {
                ...state,
                attorneyMainListLoading: false,
                attorneyMainList: action.payload,
                selectMainAttorney:null
            };
        case attorneyConstants.GET_ATTORNEY_LIST:
            return {
                ...state,
                attorneyMainList: [],
                attorneyMainListLoading: true
            };
        case attorneyConstants.SHOW_ATTORNEY_MENU:
            return {
                ...state,
                sideListMenu: action.payload
            };
        case attorneyConstants.HIDE_ATTORNEY_MENU:
            return {
                ...state,
                sideListMenu: null
            };
        case attorneyConstants.ADD_ATTORNEY_MENU_SUCCESS:
        let attorneyMainList1=[];
        attorneyMainList1[0]=action.payload;
            return {
                ...state,
                attorneyMainListLoading: false,
                attorneyMainList: attorneyMainList1, 
                selectMainAttorney:null             
            };
        case attorneyConstants.SET_ATTORNEY:
            return {
                ...state,
                selectMainAttorney: action.payload
            };
        case attorneyConstants.GET_ATTORNEY_PATIENT_LIST_SUCCESS:
            return {
                ...state,
                attorneyMainListLoading: false,
                PatientList:action.payload
            };
        case attorneyConstants.GET_ATTORNEY_PATIENT_LIST:
            return {
                ...state,
                attorneyMainListLoading: true,
                PatientList:[]
            };
        case attorneyConstants.SET_SELECTED_CONFIRM_ATTORNEY:
            return {
                ...state,                
                selectedConfirmAttorney:action.payload
            };
        case attorneyConstants.GET_ATTORNEY_PATIENTS_LIST_BYID_SUCCESS:
            return {
                ...state,
                attorneyMainListLoading: false,
                PatientsByAttorneyID:action.payload
            };
        case attorneyConstants.GET_ATTORNEY_PATIENTS_LIST_BYID:
            return {
                ...state,
                attorneyMainListLoading: true,
                PatientsByAttorneyID:[]
            };
        default:
            return state;
    }
};

export default attorneyReducer;
