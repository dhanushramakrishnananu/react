import * as homeConstants from '../../../../constants/actions/home.es6';


export function editAgedAccount(menuName, data) {
    return (dispatch) => {	
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
        dispatch({type: homeConstants.SHOW_SIDE_LIST_AGEDACCOUNT_MENU_EDIT, payload: data});       
    };
}