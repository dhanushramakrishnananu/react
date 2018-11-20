import _ from 'lodash';

import * as homeConstants from '../constants/actions/home.es6';
import { SHOW_INSURANCE_SELECTED_STEP, EDIT_INSURANCE_SUCCESS } from '../constants/actions/insurance.es6';
import { SHOW_ATTORNEY_SELECTED_STEP} from '../constants/actions/attorney.es6';

const initialState = {
    sideListMenu: null,
    selectedStep: 1,
    taskLists: [],
    taskListsLoading: false,
    taskListsError: null,
    showDeleteDialog: null,
    editItemData: [],
    editNoteItemData:[],
    editIndicatorItem:[],
    editAgedAcctData:[],
    editOpenNoteItemData:[]
};

const homeReducer = (state = initialState, action) => {
    const taskLists = state.taskLists.slice();
    let taskListObj = {};

    switch(action.type) {
        case homeConstants.SHOW_SIDE_LIST_MENU:
            return {
                ...state,
                sideListMenu: action.payload,
                selectedStep: 1
            };
        case homeConstants.SHOW_SIDE_LIST_MENU_ATTORNEY_EDIT:
            return {
                ...state,
                sideListMenu: action.payload,
                selectedStep: 3
            };
        case homeConstants.HIDE_SIDE_LIST_MENU:
            return {
                ...state,
                sideListMenu: null,
                editNoteItemData:[],
                editIndicatorItem:[],
                editAgedAcctData:[],
                editItemData: [],
                editOpenNoteItemData:[],
                selectedStep: 1,
                showDeleteDialog:null
            };
        case homeConstants.NEXT_STEP:
            return {
                ...state,
                selectedStep: state.selectedStep + 1
            };
        case homeConstants.PREV_STEP:
            return {
                ...state,
                selectedStep: state.selectedStep - 1
            };
        default:
            return state;
        // Get task lists
        case homeConstants.GET_TASK_LISTS:
            return {
                ...state,
                taskListsLoading: true,
                taskListsError: null
            };
        case homeConstants.GET_TASK_LISTS_SUCCESS:
            return {
                ...state,
                taskLists: action.payload,
                taskListsLoading: false
            };
        case homeConstants.GET_TASK_LISTS_ERROR:
            return {
                ...state,
                taskListsLoading: false,
                taskListsError: action.payload
            };

        // Get task list details
        case homeConstants.GET_TASK_LIST_DETAILS:
            taskListObj = _.find(taskLists, {WorkListID: action.payload.taskListId});
            taskListObj.loading = true;
            taskListObj.error = null;

            return {
                ...state,
                taskLists: taskLists
            };
        case homeConstants.GET_TASK_LIST_DETAILS_SUCCESS:
            taskListObj = _.find(taskLists, {WorkListID: action.payload.taskListId});
            taskListObj.loading = false;
            taskListObj.patients = action.payload.patients;
            return {
                ...state,
                taskLists: taskLists
            };
        case homeConstants.GET_TASK_LIST_DETAILS_ERROR:
            taskListObj = _.find(taskLists, {WorkListID: action.payload.taskListId});
            taskListObj.loading = false;
            taskListObj.error = action.payload;
            return {
                ...state,
                taskLists: taskLists
            };
        case homeConstants.SHOW_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: action.payload
            };
        case homeConstants.HIDE_DELETE_ICON:
            return {
                ...state,
                showDeleteDialog: action.payload
            };
        case homeConstants.SHOW_SIDE_LIST_MENU_EDIT:
            return {
                ...state,
                editItemData: action.payload
            };
        case homeConstants.UPDATE_ATFAULT_LIST_MENU_EDIT:
            return {
                ...state,
                editItemData: action.payload
            };
        case SHOW_INSURANCE_SELECTED_STEP:
            return{
                ...state,
                selectedStep: action.payload
            };
        case SHOW_ATTORNEY_SELECTED_STEP:
            return{
                ...state,
                selectedStep: action.payload
            };
        case homeConstants.SHOW_SIDE_LIST_NOTE_MENU_EDIT:
            return {
                ...state,
                editNoteItemData: action.payload,
                editOpenNoteItemData:[]
            };
        case homeConstants.SHOW_SIDE_LIST_INDICATOR_MENU_EDIT:
            return {
                ...state,
                editIndicatorItem: action.payload
            };
        case homeConstants.SHOW_SIDE_LIST_AGEDACCOUNT_MENU_EDIT:
            return {
                ...state,
                editAgedAcctData:action.payload
            };
        case homeConstants.SELECTED_INDICATOR_CLEAR:
            return {
                ...state,
                editIndicatorItem:[]
            };
        case homeConstants.SHOW_SIDE_LIST_OPEN_NOTE_MENU_EDIT:
            return {
                ...state,
                editOpenNoteItemData: action.payload,
                editNoteItemData:[]
            };
    }
};

export default homeReducer;