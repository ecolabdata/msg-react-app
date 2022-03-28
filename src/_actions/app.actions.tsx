import {Dispatch} from 'redux'; 
import {
    ROTATE_POPOVER_CHEVRON_SUCCESS,
    UPDATE_APP_STATE_PROPERTY,
} from './app.actions.name'

interface PropertyData {
    propertyValue: string,
    propertyName: string,
}


const rotatePopOverChevron = () => {
    
    const success = () => ({
        type: ROTATE_POPOVER_CHEVRON_SUCCESS
    });
   
    return (dispatch: Dispatch) => {
    
        dispatch(success());

    };
};

const updateStateProperty = (propertyValue:string, propertyName:string) => {

  
  const propertyData = {
    propertyValue,
    propertyName,
  };
  
  const success = (propertyData:PropertyData) => ({ type: UPDATE_APP_STATE_PROPERTY, payload: propertyData });
    return (dispatch:Dispatch) => {
  
      dispatch(success(propertyData));
    };
};

export const appActions = {
    rotatePopOverChevron,
    updateStateProperty,
}


