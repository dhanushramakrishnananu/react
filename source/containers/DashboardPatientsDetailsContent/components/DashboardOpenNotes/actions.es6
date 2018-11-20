import * as homeConstants from '../../../../constants/actions/home.es6';

export function showEditSideListMenu(menuName, data) {
    return (dispatch) => {
    
  		dispatch({type: homeConstants.HIDE_SIDE_LIST_MENU});
	
        setTimeout(() => {dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});}, 500)
        dispatch({type: homeConstants.SHOW_SIDE_LIST_OPEN_NOTE_MENU_EDIT, payload: data});
    };
}
export function selectNoteItem(value) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_OPEN_NOTE_MENU_EDIT, payload: value});
    };
}