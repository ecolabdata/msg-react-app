export interface PublicProspectCardData { 
    publicProspectIndications: string
    dataPercentage : {percentage: number, outOfMarkets: [number, number], description: string}[]
}

export interface InnovationSupportCardData {
    objectivesAndContext: string,
    beneficiaries: string[],
    eligibilityRequirements: string,
    dataSource: [string, string],
    amount: string,
    contact : [string, number, string]
}

export interface CustomerSupportCardData {
    objectivesAndContext: string,
    beneficiaries: string[],
    dataSource: [string, string],
    eligibilityRequirements: string,
    contact: [string, string, string]
}

export interface  PlannedPurchaseCardData  {
    purchaseCategory: string,
    context: string,
    procedureType: string,
    dataSource: [string, string],
    publicationDate: Date
    duration : number,
    EstimatedMArketAmount: number,
    contact: [string, string]

}

export interface  PrivateInvestorCardData  {
    investmentType: string,
    sectors: string[],
    amounts : [number, number],
    dataSource: [string, string],
    contact: [string, string, string]

}

export interface CardData {
    title: string;
    subtitle: string;
    contentData: PublicProspectCardData | InnovationSupportCardData | CustomerSupportCardData | PlannedPurchaseCardData | PrivateInvestorCardData;

}