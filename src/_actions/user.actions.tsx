
import { AxiosResponse, AxiosError } from 'axios';
import {Dispatch} from 'redux';
import {
    RECORD_USER_KEY_WORDS_RESEARCH_REQUEST,
    RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS,
    RECORD_USER_KEY_WORDS_RESEARCH_FAILURE,
    RECORD_CARDS_DISPLAYED_RANGE_REQUEST,
    RECORD_CARDS_DISPLAYED_RANGE_SUCCESS,
    RECORD_CARDS_DISPLAYED_RANGE_FAILURE,
} from './user.actions.name';

import JSONData from './../utils/mockCardsData.json';

import {userServices, UserResearchKeyWordsType} from '../_services/user.service';


const recordUserKeyWordsResearch =  (userKeyWords:UserResearchKeyWordsType) => {
    
    const request = () => ({ type: RECORD_USER_KEY_WORDS_RESEARCH_REQUEST });

    const success = (userKeyWordsResponse:AxiosResponse) => ({ type: RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS, payload: userKeyWordsResponse });

    const failure = (userKeyWordsError:AxiosError) => ({ type: RECORD_USER_KEY_WORDS_RESEARCH_FAILURE, payload: userKeyWordsError });
    
    return( dispatch:Dispatch) => {
        dispatch(request());

        userServices.recordUserKeyWordsResearch(userKeyWords)
            .then(

                (response) => {

                    if(response !== undefined) {

                        dispatch(success(response));
                    }

                },

                (error:AxiosError) => {
                    dispatch(failure(error))
                }
            )
    };

  
};

const cardsDisplayedDesiredRange = (jsonData: typeof JSONData) => {
  
    const request = () => {
      
      return {
      
        type: RECORD_CARDS_DISPLAYED_RANGE_REQUEST
      
      };
    };
    
    const success = (response: typeof JSONData) => {
      
      return {
      
        type: RECORD_CARDS_DISPLAYED_RANGE_SUCCESS,
      
        payload: response
      
      };
    };
    
    const failure = (error: AxiosError) => {
      
      return {
      
        type: RECORD_CARDS_DISPLAYED_RANGE_FAILURE,
      
        payload: error
      
      };
    };

    return (dispatch: Dispatch) => {
      
      const rangeCardsToDisplay = jsonData.slice(0,20);
      console.log('rangeCardsToDisplay :>> ', rangeCardsToDisplay);
  
      dispatch(success(rangeCardsToDisplay));
      dispatch(request());
      
      //service.action here
    
        // .then(
  
        //   (response) => {
        //     dispatch(success(response));
        //   },
        //   (error) => {
        //     dispatch(failure(error));
        //   }
  
        // );
  
    };
  };

export const userActions = {
    recordUserKeyWordsResearch,
    cardsDisplayedDesiredRange,

};
