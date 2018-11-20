import * as searchConstants from '../constants/actions/search.es6';
import _ from 'lodash';

const initialState = {
    SearchList: [],
    searchlistloading:false,
    sideListMenu:null
};

const searchReducer = (state = initialState, action) => {
    let SearchList = null;
    switch(action.type) {
    case searchConstants.SHOW_SEARCH_DATA:
            return {
                ...state,
                SearchList:[],
                 searchlistloading:true
            };
        case searchConstants.SHOW_SEARCH_MENU:
            return {
                ...state,
                SearchList:[],
                 searchlistloading:false,
                 sideListMenu:action.payload

                
            };
        case searchConstants.HIDE_SEARCH_MENU:
            return {
                ...state,
                sideListMenu: null
            };
        case searchConstants.SEARCH_RESULT:
            return {
                ...state,
                SearchList:[],
                 searchlistloading:true
            };
       
       
        case searchConstants.SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchlistloading:false,
                SearchList:action.payload
               
            };
         case searchConstants.CLEAR_DATA:

           return {
                ...state,
                searchlistloading:false,
                SearchList:[]
               
            };
        default:
            return state;
    }
};

export default searchReducer;