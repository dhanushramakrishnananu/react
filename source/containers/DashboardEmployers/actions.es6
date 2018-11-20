import * as employeeConstants from '../../constants/actions/employee.es6';
import * as employeeService from '../../services/employeeService.es6';
import notifications from '../../notifications.jsx';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: employeeConstants.SHOW_EMPLOYER_MENU, payload: menuName});
    };
}

export function hideSideListMenu() {
    return (dispatch) => {
        dispatch({type: employeeConstants.HIDE_EMPLOYER_MENU});
    };
}

export function saveEmployee(data) {
var msg=''
if(data.EmployerId==0 || data.EmployerId==undefined)
msg='Employee successfully added!';
else
msg='Employee successfully updated!';
var searchstring=data.searchstring;
     return (dispatch) => {
        dispatch({type: employeeConstants.SAVE_EMPLOYEE});
         employeeService.saveEmployee(data)
            .then((response) => {
                dispatch({type: employeeConstants.SAVE_EMPLOYEE_SUCCESS, payload: response.data});
                 if(searchstring==null||searchstring.trim().length>0)
                {dispatch({type: employeeConstants.SEARCH_EMPLOYEE_INPUT});
               
              employeeService.getEmployeeList(searchstring)
            .then((response) => {
                dispatch({type: employeeConstants.SEARCH_EMPLOYEE_SUCCESS, payload: response.data});
            })}
                 notifications.showSuccess(msg);
                 
            })
           
    };
}

export function searchEmployee(searchInputValue) {
    return (dispatch) => {
        dispatch({type: employeeConstants.SEARCH_EMPLOYEE_INPUT});
         employeeService.getEmployeeList(searchInputValue)
            .then((response) => {
                dispatch({type: employeeConstants.SEARCH_EMPLOYEE_SUCCESS, payload: response.data});
                if(response.data.length==0)
                 notifications.showSuccess("No records found")
            })
           
    };
    }
    export function selectEmployee(data) {
    return (dispatch) => {
        dispatch({type: employeeConstants.SELECT_EMPLOYEE,payload:data});
         
           
    };

}
export function editEmployer(menu,data) {
    return (dispatch) => {  
        dispatch({type: employeeConstants.SHOW_EMPLOYER_MENU, payload: menu});
        dispatch({type: employeeConstants.EDIT_EMPLOYEE,payload:data});
         
           
    };
    }
export function clearData() {
    return (dispatch) => {  
        dispatch({type: employeeConstants.CLEARDATA});
         
           
    };
    }