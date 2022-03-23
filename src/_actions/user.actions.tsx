
import { AxiosResponse, AxiosError } from 'axios';
import {Dispatch} from 'redux';
import {
    RECORD_USER_KEY_WORDS_RESEARCH_REQUEST,
    RECORD_USER_KEY_WORDS_RESEARCH_SUCCESS,
    RECORD_USER_KEY_WORDS_RESEARCH_FAILURE,
} from './user.actions.name';

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

  
}

export const userActions = {
    recordUserKeyWordsResearch,   
};
