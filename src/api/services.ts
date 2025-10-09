import { CardApiNames } from './interfaces/common';

export const baseApiUrl = 'https://api-v5.msg.greentechinnovation.fr';

const baseGetRequestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const basePostRequestOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const generateFetchParams = (params: Record<string, unknown>, apiName: CardApiNames) => {
  const url = `${baseApiUrl}/v5/${apiName}`;
  return {
    url,
    options: {
      body: JSON.stringify(params),
      ...basePostRequestOptions
    }
  };
};
export const generateCardByIdFetchParams = (id: string, apiName: CardApiNames) => {
  return {
    url: `${baseApiUrl}/v5/${apiName}/${id}`,
    ...baseGetRequestOptions
  };
};
