import { DefaultRootState } from 'react-redux';
import {
    RECORD_USER_KEY_WORDS_RESEARCH_REQUEST,
    RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS,
    RECORD_USER_KEY_WORDS_RESEARCH_FAILURE,
    RECORD_CARDS_DISPLAYED_RANGE_REQUEST,
    RECORD_CARDS_DISPLAYED_RANGE_SUCCESS,
    RECORD_CARDS_DISPLAYED_RANGE_FAILURE
} from '../_actions/user.actions.name';

export interface ActionType {
    type: string,
    payload?:any
};

export interface StateType extends DefaultRootState {
    [key : string]:any,
};

const initialState = {
    popOverChevronRotate:false,
    cardsPerPage:20,
    currentPage: 0,
};

export default function userReducer(state:StateType=initialState, action:ActionType) {
    
    switch(action.type){
        
        case RECORD_USER_KEY_WORDS_RESEARCH_REQUEST :
            
            return {
                ...state,
                recordUserKeyWordsLoading: !state.popOverChevronRotate,
            };
            
        case RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS :
            
            return {
                ...state,
                keyWordsList: action.payload,
            };

        case RECORD_USER_KEY_WORDS_RESEARCH_FAILURE :
        
            return {
                ...state,
                error: action.payload,
            };
        

        case RECORD_CARDS_DISPLAYED_RANGE_REQUEST :
            return {
                ...state,
                cardsToDisplayLoading: true,
            };
        
        case RECORD_CARDS_DISPLAYED_RANGE_SUCCESS :
            return {
                ...state,
                cardsInRangeOfTwenty: action.payload,
            };
        
        
        default:
            return state;
    }
};