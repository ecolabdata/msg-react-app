
import ActionType from './../_reducers/appState.reducer'
import {NavigateFunction} from 'react-router';
import {Dispatch} from 'redux';


const storeNavigateHook =  (navigateHook:NavigateFunction) => {
    return( dispatch:Dispatch) => {
    };

}

export const appActions = {
    storeNavigateHook,   
};
