import axios, {AxiosResponse} from 'axios'
import {handleErrors} from '../utils';

export interface UserResearchKeyWordsType extends AxiosResponse  {
    userResearchKeyWords:string[],
}

const recordUserKeyWordsResearch = async (userResearchKeyWords:UserResearchKeyWordsType) => {
    
    const strategy = process.env.REACT_APP_STRATEGYAUTH;
    const apiURL = process.env.REACT_APP_API_URL || '';
    const requestOptions = {
        strategy,
        userResearchKeyWords
    };

    try {
        const recordUserKeyWordsResponse = await axios.post(apiURL, requestOptions);
        return recordUserKeyWordsResponse;
    } catch (error) {
        handleErrors(error);
    }
        
}


export const userServices = {
    recordUserKeyWordsResearch,
}

