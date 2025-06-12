// export const baseApiUrl = process.env.REACT_APP_API_URL;
export const baseApiUrl = 'http://51.159.164.20:8888';
const companyCardUrl = `${baseApiUrl}/v5/company_cards`;

const baseGetRequestOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const generateCompanyFetchParams = (params: any) => {
  // V5 sould be doable to have only one param generator, using an other parameter cardType and a cardTypeToUrlMap
  return {
    url: companyCardUrl,
    options: {
      body: JSON.stringify(params),
      ...baseGetRequestOptions
    }
  };
};
export const generateCompanyByIdFetchParams = (id: string) => {
  return {
    url: `${companyCardUrl}/${id}`,
    ...baseGetRequestOptions
  };
};
