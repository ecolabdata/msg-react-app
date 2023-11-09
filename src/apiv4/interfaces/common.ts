export type BaseResultCard = {
  id: string;
  score: number;
  highlight: any; //TODO
};

export type AideTerritoire = {
  id: number | null;
  slug: string | null;
  url: string | null;
  name: string | null;
  name_initial: string | null;
  short_title: string | null;
  financers: string[] | null;
  instructors: string[] | null;
  programs: string[] | null;
  description: string | null;
  eligibility: string | null;
  perimeter: string | null;
  mobilization_steps: string[] | null;
  origin_url: string | null;
  categories: string[] | null;
  is_call_for_project: boolean | null;
  application_url: string | null;
  targeted_audiences: string[] | null;
  aid_types: string[] | null;
  is_charged: boolean | null;
  destinations: string[] | null;
  start_date: string | null;
  predeposit_date: string | null;
  submission_deadline: string | null;
  subvention_rate_lower_bound: number | null;
  subvention_rate_upper_bound: number | null;
  loan_amount: number | null;
  recoverable_advance_amount: string | null;
  contact: string | null;
  recurrence: string | null;
  project_examples: string | null;
  import_data_url: string | null;
  import_data_mention: string | null;
  import_share_licence: string | null;
  date_created: string | null;
  date_updated: string | null;
  titulaires: Titulaire[] | null;
};

export type Titulaire = {
  typeIdentifiant: string | null;
  id: string | null;
  denominationSociale: string | null;
};

export type ReservedPublicMarkets = {
  label: string | null;
  code: string | null;
};

export type Department = {
  department: string | null;
};
