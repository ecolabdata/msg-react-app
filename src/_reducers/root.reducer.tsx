import { combineReducers } from 'redux';
import  appReducer from './app.reducer'
import  userReducer from './user.reducer'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer  = combineReducers({
    appState: appReducer,
    userState: userReducer,
});


export default rootReducer;
