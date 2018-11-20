import * as insuranceConstants from '../constants/actions/insurance.es6';
import _ from 'lodash';

const initialState = {
    sideListMenu: null,
    teamList: {},
    teamListLoading: true,
    teamListError: null,
    insuranceList: [],
    insuranceListInitial: [],
    insuranceListLoading: true,
    insuranceListError: null,
    searchInputValue: '',
    insuranceSearchListLoading: true,
    insuranceSearchList: [],
    selectedInsurance: {},
    selectedInsuranceItem: {},
    groupAccountLoading: false,
    groupAccountError: null,
    groupAccountData: {},
    Adjusterdetail:[],
    selectedTeam:0,
    AdjusterID:null,
    claimlistloading:false,
    claimlist:[],
    insurancesearchList:[],
    patientlistloading:false,
    patientlist:[],
    AdjusterReplace:null,
    AdjusterDelete:null
};

const insuranceReducer = (state = initialState, action) => {
    let insuranceList = null;
    switch(action.type) {
        case insuranceConstants.SHOW_INSURANCE_MENU:
            return {
                ...state,
                sideListMenu: action.payload,
                Adjusterdetail:action.payload=='addInsuranceMenu'?null:state.Adjusterdetail,
                AdjusterID:action.payload=='addInsuranceMenu'?null:state.AdjusterID
            };
        case insuranceConstants.HIDE_INSURANCE_MENU:
            return {
                ...state,
                sideListMenu: null,
                 patientlist:[],
            AdjusterReplace:null,
            AdjusterDelete:null,
            insuranceSearchList:[]
            };
        case insuranceConstants.GET_TEAM_LIST:
            return {
                ...state,
                teamList: {},
                teamListLoading: true,
                teamListError: null
            };
        case insuranceConstants.GET_TEAM_LIST_SUCCESS:
            return {
                ...state,
                teamList: action.payload,
                teamListLoading: false
            };
        case insuranceConstants.GET_TEAM_LIST_ERROR:
            return {
                ...state,
                teamListLoading: false,
                teamListError: action.payload
            };
        case insuranceConstants.GET_INSURANCE_LIST:
            return {
                ...state,
                insuranceList: [],
                insuranceListInitial: [],
                insuranceListLoading: true,
                insuranceListError: null,
                selectedTeam:action.payload,
                Adjusterdetail:null,
                AdjusterID:null
            };
        case insuranceConstants.GET_INSURANCE_LIST_SUCCESS:
            return {
                ...state,
                insuranceList: action.payload.Inslist,
                insuranceListInitial: action.payload.Inslist,
                insuranceListLoading: false
            };
        case insuranceConstants.GET_INSURANCE_LIST_ERROR:
            return {
                ...state,
                insuranceListLoading: false,
                insuranceListError: action.payload
            };
        case insuranceConstants.SEARCH_INPUT_CHANGE:
            const searchInputValue = action.payload;
            insuranceList = _.filter(state.insuranceListInitial, insuranceObj => {
                const fields = [insuranceObj.Adjuster, insuranceObj.InsuranceCo, insuranceObj.ClaimCount.toString()];

                return _.some(fields, field => field.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1);
            });
            return {
                ...state,
                insuranceList: insuranceList,
                searchInputValue: searchInputValue
            };
        case insuranceConstants.SEARCH_INSURANCE_DETAILS_SUCCESS:
            return {
                ...state,
                insuranceSearchListLoading: false,
                insuranceSearchList: action.payload
            };
        case insuranceConstants.SET_INSURANCE_SEARCH_FIELDS_QUERY:
            return {
                ...state,
                insuranceSearchListLoading: true,
                searchFields: action.payload
            };
        case insuranceConstants.SET_SELECTED_INSURANCE:
            return {
                ...state,
                selectedInsurance: action.payload
            };
        case insuranceConstants.SELECT_INSURANCE_ITEM:
            return {
                ...state,
                selectedInsuranceItem: action.payload
            };
        case insuranceConstants.GET_GROUP_ACCOUNT:
            return {
                ...state,
                groupAccountError: null,
                groupAccountLoading: true
            };
        case insuranceConstants.GET_GROUP_ACCOUNT_DATA_SUCCESS:
            return {
                ...state,
                groupAccountData: action.payload,
                groupAccountLoading: false
            };
        case insuranceConstants.GET_GROUP_ACCOUNT_DATA_ERROR:
            return {
                ...state,
                groupAccountError: action.payload,
                groupAccountLoading: false
            };
            case insuranceConstants.SELECT_INSURANCE_DATA_SUCCESS:
            return {
                ...state,
                Adjusterdetail: action.payload,
                AdjusterID:action.payload.InsuranceMainID
            };
             case insuranceConstants.SELECT_INSURANCE_DATA:
            return {
                ...state,
                AdjusterID: action.payload
                
            };
            
            
            case insuranceConstants.DELETE_INSURANCE_SUCCESS:
            return {
                ...state,
                Adjusterdetail: null,
                AdjusterID:null
                
            };
            case insuranceConstants.INSERT_INSURANCE_DATA_SUCCESS:
            return {
                ...state,
                sideListMenu:null
                
            };
            case insuranceConstants.CLAIM_LIST:
            return {
                ...state,
                claimlistloading:true

                
            };
             case insuranceConstants.CLAIM_LIST_SUCCESS:
            return {
                ...state,
                claimlistloading:false,
                claimlist:action.payload
                
            };
             case insuranceConstants.CLAIM_LIST_ERROR:
            return {
                ...state
                
            };
              case insuranceConstants.PATIENT_LIST:
            return {
                ...state,
                patientlistloading:true,
                AdjusterDelete:action.payload

                
            };
             case insuranceConstants.PATIENT_LIST_SUCCESS:
            return {
                ...state,
                patientlistloading:false,
                patientlist:action.payload.insPatients
                
            };
             case insuranceConstants.PATIENT_LIST_ERROR:
            return {
                ...state
                
            };
             case insuranceConstants.PATIENT_LIST_REPLACE:
            return {
                ...state,
                patientlistloading:true,
                AdjusterReplace:action.payload

                
            };
             case insuranceConstants.PATIENT_LIST_REPLACE_SUCCESS:
            return {
                ...state,
                patientlistloading:false,
                patientlist:action.payload.insPatients
                
            };
             case insuranceConstants.PATIENT_LIST_REPLACE_ERROR:
            return {
                ...state
                
            };
             case insuranceConstants.CLEARDATA:
            return {
                ...state,
                patientlist:[],
            AdjusterReplace:null,
            AdjusterDelete:null,
            insuranceSearchList:[]

                
            };
        default:
            return state;


    }
};

export default insuranceReducer;