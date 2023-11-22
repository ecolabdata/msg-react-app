import { BaseResultCard } from './common';

export type CompanyResult = BaseResultCard & {
  card: CompanyCard;
};

export type CompanyCard = {
  slug: string;
  name: string;
  short_description: string | null;
  logo_url: string | null;
  description: string | null;
  creation_date: string | null;
  headquarter_address: string | null;
  regions: string[] | null;
  project_name: string | null;
  project_description: string | null;
  themes: string[] | null;
  website_url: string | null;
  supports: string[] | null;
  private_clients: string[] | null;
  public_clients: string[] | null;
  contact_phone: string | null;
  contact_email: string | null;
  source_url: string | null;
  enjeux_odd: string[] | null;
  marches: string[] | null;
  labels: string[] | null;
  project_picture_url: string | null;
  project_video_url: string | null;
  data_source: {
    greentech_innovation: GreenTechInnovation | null;
    green20: Green20 | null;
    solar_impulse: SolarImpulse | null;
  };
};

export type GreenTechInnovation = {
  'Start-up': string | null;
  Pitch: string | null;
  Thématique: string | null;
  Projet: string | null;
  "L'entreprise": string | null;
  'Le projet': string | null;
  'Site internet': string | null;
  Mail: string | null;
  LinkedIn: string | null;
  Téléphone: string | null;
  Marché: string[] | null;
  Soutiens: string[] | null;
  'Enjeux ODD': string[] | null;
  Logo: GreenTechLogo[] | null;
  Région: string[] | null;
  'Références publiques': string[] | null;
  'Références privées': string[] | null;
  'Référencée UGAP': string | null;
  RNIG: string[] | null;
  SIREN: number | null;
  "Technologie utilisant l'IA ": boolean | null;
  'Interet pour les DOM-TOM': string | null;
  'Description rapide utilisation IA': string | null;
};

type GreenTechLogo = {
  id: string;
  width?: number | null;
  height?: number | null;
  url: string;
  filename: string;
  size?: number | null;
  type?: string | null;
  thumbnails?: Thumbnails | null;
};

type Green20 = {
  "Nom de l'entreprise": string | null;
  Pitch: string | null;
  "Date de création de l'entreprise": string | null;
  'Région du siège social ': string | null;
  "Secteurs d'activité": string | null;
  'Marché prioritaire France 2030': string | null;
  'Siren/Siret': string | null;
};

type SolarImpulse = {
  field_id: string | null;
  Siret: string | null;
  'Solution name': string | null;
  'Country - from Companies': string | null;
  'Company Name - from Companies': string | null;
  'Labelling date': string | null;
  one_sentence_description: string | null;
  public_short_description: string | null;
  'Link Solutions Explorer (from solutionrewrites)': string | null;
};

type Thumbnails = {
  small: Thumbnail | null;
  large: Thumbnail | null;
  full: Thumbnail | null;
};

type Thumbnail = {
  url: string | null;
  width: number | null;
  height: number | null;
};
