import * as employeeConstants from '../constants/actions/employee.es6';
import _ from 'lodash';

const initialState = {
    EmployeeList: [],
    employeelistloading:false,
    sideListMenu:null,
    selectedEmploye:null
};

const employeeReducer = (state = initialState, action) => {
    let EmployeeList = null;
    switch(action.type) {
    case employeeConstants.SEARCH_EMPLOYEE_INPUT:
            return {
                ...state,
                EmployeeList:[],
                 employeelistloading:true
            };
        case employeeConstants.SHOW_EMPLOYER_MENU:
            return {
                ...state,
                sideListMenu: action.payload,
                selectedEmploye:action.payload=="addEmployerMenu"?[]:state.selectedEmploye
            };
        case employeeConstants.HIDE_EMPLOYER_MENU:
            return {
                ...state,
                sideListMenu: null
            };
         case employeeConstants.SAVE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                sideListMenu:null
            };
        
       
       
        case employeeConstants.SEARCH_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employeelistloading:false,
               EmployeeList: action.payload,
                selectedEmploye:[]

            };
         
        case employeeConstants.SELECT_EMPLOYEE:
            return {
                ...state,
                employeelistloading:false,
               EmployeeList: action.payload.list,
               selectedEmploye:action.payload.selectedemploye

            }; 
             case employeeConstants.EDIT_EMPLOYEE:
            return {
                ...state, 
                selectedEmploye:action.payload

            };
            case employeeConstants.CLEARDATA:
            return {
                ...state, 
                selectedEmploye:[],
                EmployeeList:[]


            };
        default:
            return state;
    }
};

export default employeeReducer;