import { combineReducers } from 'redux';
import  appState from './appState.reducer'
const rootReducer  = combineReducers({
    appState,
});

export default rootReducer;
