import * as searchConstants from '../../constants/actions/search.es6';
import * as searchService from '../../services/searchService.es6';
import * as patientDetailsService from '../../services/patientDetails.es6';

import notifications from '../../notifications.jsx';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: searchConstants.SHOW_SEARCH_MENU, payload: menuName});
    };
    }
 
export function searchData(data) {
    return (dispatch) => {
        dispatch({type: searchConstants.SHOW_SEARCH_DATA});
         searchService.getSearchList(data)
            .then((response) => {
                dispatch({type: searchConstants.SEARCH_RESULT_SUCCESS, payload: response.data});
                if(response.data.length==0)
                 notifications.showSuccess("No records found")
            })
           
    };
    }
    export function clearData() {
    return (dispatch) => {
        dispatch({type: searchConstants.CLEAR_DATA});
    };
    }

    

