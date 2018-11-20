import * as homeConstants from '../../../../constants/actions/home.es6';

export function showSideListMenu(menuName) {
    return (dispatch) => {
        dispatch({type: homeConstants.SHOW_SIDE_LIST_MENU, payload: menuName});
    };
}