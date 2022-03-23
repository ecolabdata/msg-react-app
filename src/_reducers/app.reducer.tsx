import { DefaultRootState } from 'react-redux';
import {
    UPDATE_APP_STATE_PROPERTY,
    ROTATE_POPOVER_CHEVRON_SUCCESS,
} from '../_actions/app.actions.name';

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

export default function appReducer(state:StateType=initialState, action:ActionType) {
    
    switch(action.type){
        
        case ROTATE_POPOVER_CHEVRON_SUCCESS :
            
            return {
                ...state,
                popOverChevronRotate: !state.popOverChevronRotate,
            };
            
        case UPDATE_APP_STATE_PROPERTY :
            return {
                ...state,
                [action.payload.propertyName]: action.payload.propertyValue,
            }

        default:
            return state;
    }
};