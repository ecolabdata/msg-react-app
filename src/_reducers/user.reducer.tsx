import { DefaultRootState } from 'react-redux';
import {
    RECORD_USER_KEY_WORDS_RESEARCH_REQUEST,
    RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS,
    RECORD_USER_KEY_WORDS_RESEARCH_FAILURE,
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
                keyWordsList: !state.popOverChevronRotate,
            };

        case RECORD_USER_KEY_WORDS_RESEARCH_FAILURE :
        
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};