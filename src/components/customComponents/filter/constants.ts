import { AnyFilters } from './filters';

export type Region =
  | 'Auvergne-Rhône-Alpes'
  | 'Bourgogne-Franche-Comté'
  | 'Bretagne'
  | 'Corse'
  | 'Centre-Val de Loire'
  | 'Grand Est'
  | 'Hauts-de-France'
  | 'Ile-de-France'
  | 'Nouvelle Aquitaine'
  | 'Normandie'
  | 'Occitanie'
  | "Provence-Alpes-Côte d'Azur"
  | 'Pays de la Loire'
  | 'Guadeloupe'
  | 'Guyane'
  | 'La Réunion'
  | 'Martinique'
  | 'Mayotte';

export type PublicationDates = 'publié' | 'Moins de 6 mois' | '6 mois et plus';

export const publicationDates: Record<PublicationDates, number> = {
  publié: 0,
  'Moins de 6 mois': 6,
  '6 mois et plus': 7
};

export const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

export const deadlines: Record<string, number> = {
  "Moins d'1 mois": 0,
  'Moins de 3 mois': 3,
  'Moins de 6 mois': 6
};

export const helpTypes: Record<string, string> = {
  Subvention: 'Subvention',
  Prêt: 'Prêt',
  'Avance récupérable': 'Avance récupérable',
  'Autre aide financière': 'Autre aide financière',
  'Ingénierie technique': 'Ingénierie technique',
  'Ingénierie financière': 'Ingénierie financière',
  'Ingénierie Juridique / administrative': 'Ingénierie Juridique / administrative'
};

export const fundingTypes: Record<string, string> = {
  'Capital croissance': 'Capital croissance',
  'Capital développement (développement/croissance)':
    'Capital développement (développement/croissance)',
  'Capital risque (innovation/création)': 'Capital risque (innovation/création)',
  'Capital transmission (consolidation/transmission)':
    'Capital transmission (consolidation/transmission)',
  'Capital transmission': 'Capital transmission',
  Infrastructure: 'Infrastructure',
  'Dette privée': 'Dette privée'
};

export const entities: Record<string, string> = {
  etat: 'etat',
  'collectivités territoriales': 'collectivités territoriales',
  'fonction hospitaliere': 'fonction hospitaliere',
  'autres entités': 'autres entités'
};

export const certifications: Record<string, string> = {
  'Ville durable et innovante': 'Ville durable et innovante',
  'Climat air énergie': 'Climat air énergie'
};

export const departmentsByRegion: Record<Region, string[] | number[]> = {
  'Auvergne-Rhône-Alpes': [1, 3, 7, 15, 26, 38, 42, 43, 63, 69, 73, 74],
  'Bourgogne-Franche-Comté': [21, 25, 39, 58, 70, 71, 89, 90],
  Bretagne: [22, 29, 35, 56],
  'Centre-Val de Loire': [18, 28, 36, 37, 41, 45],
  Corse: ['2A', '2B'],
  'Grand Est': [8, 10, 51, 52, 54, 55, 57, 67, 68, 88],
  Guadeloupe: [971],
  Guyane: [973],
  'Hauts-de-France': [2, 59, 60, 62, 80],
  'Ile-de-France': [75, 77, 78, 91, 92, 93, 94, 95],
  'La Réunion': [974],
  Martinique: [972],
  Mayotte: [976],
  Normandie: [14, 27, 50, 61, 76],
  'Nouvelle Aquitaine': [16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87],
  Occitanie: [9, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82],
  'Pays de la Loire': [44, 49, 53, 72, 85],
  "Provence-Alpes-Côte d'Azur": [4, 5, 6, 13, 83, 84]
};

export const zones: Record<Region, Region> = {
  'Auvergne-Rhône-Alpes': 'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté': 'Bourgogne-Franche-Comté',
  Bretagne: 'Bretagne',
  Corse: 'Corse',
  'Centre-Val de Loire': 'Centre-Val de Loire',
  'Grand Est': 'Grand Est',
  'Hauts-de-France': 'Hauts-de-France',
  'Ile-de-France': 'Ile-de-France',
  'Nouvelle Aquitaine': 'Nouvelle Aquitaine',
  Normandie: 'Normandie',
  Occitanie: 'Occitanie',
  "Provence-Alpes-Côte d'Azur": "Provence-Alpes-Côte d'Azur",
  'Pays de la Loire': 'Pays de la Loire',
  Guadeloupe: 'Guadeloupe',
  Guyane: 'Guyane',
  'La Réunion': 'La Réunion',
  Martinique: 'Martinique',
  Mayotte: 'Mayotte'
};

export const zonesSynonymes: Record<Region, string[]> = {
  'Auvergne-Rhône-Alpes': ['Auvergne-Rhône-Alpes', 'Auvergne Rhône Alpes'],
  'Bourgogne-Franche-Comté': ['Bourgogne-Franche-Comté', 'Bourgogne Franche Comté'],
  Bretagne: ['Bretagne'],
  Corse: ['Corse'],
  'Centre-Val de Loire': ['Centre-Val de Loire', 'Centre Val de Loire'],
  'Grand Est': ['Grand Est'],
  'Hauts-de-France': ['Hauts-de-France', 'Hauts de France'],
  'Ile-de-France': ['Ile-de-France', 'Île-de-France', 'Île de France', 'Ile de France'],
  'Nouvelle Aquitaine': ['Nouvelle Aquitaine', 'Nouvelle-Aquitaine'],
  Normandie: ['Normandie'],
  Occitanie: ['Occitanie'],
  "Provence-Alpes-Côte d'Azur": ["Provence-Alpes-Côte d'Azur", "Provence Alpes Côte d'Azur"],
  'Pays de la Loire': ['Pays de la Loire'],
  Guadeloupe: ['Guadeloupe'],
  Guyane: ['Guyane'],
  'La Réunion': ['La Réunion'],
  Martinique: ['Martinique'],
  Mayotte: ['Mayotte']
};

export type FilterDefinition = {
  label: string;
  defaultOption?: string;
  options?: string[];
  id: keyof AnyFilters;
  type: 'select' | 'toggle' | 'inputNumber';
  initialValue: string | boolean | number;
};

export const publicationDateFilter: FilterDefinition = {
  label: 'Date de publication',
  defaultOption: 'Toutes',
  options: Object.keys(publicationDates),
  id: 'publicationDate' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};
export const zoneFilter: FilterDefinition = {
  label: 'Zone',
  defaultOption: 'Toutes',
  options: Object.keys(zones),
  id: 'zone' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};
export const environnementalFilter: FilterDefinition = {
  label: 'Considération environnementale',
  id: 'hasEcologicalConcern' as keyof AnyFilters,
  type: 'toggle',
  initialValue: false
};

export const marketFilter: FilterDefinition = {
  label: 'Type de marché',
  defaultOption: 'Tous',
  options: Object.keys(markets),
  id: 'market' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const certificationFilter: FilterDefinition = {
  label: 'Labels obtenus',
  defaultOption: 'Tous',
  options: Object.keys(certifications),
  id: 'certification' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const entityFilter: FilterDefinition = {
  label: 'Entité',
  defaultOption: 'Toutes',
  options: Object.keys(entities),
  id: 'entity' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const deadlineFilter: FilterDefinition = {
  label: 'Echéance',
  defaultOption: 'Toutes',
  options: Object.keys(deadlines),
  id: 'deadline' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const helpTypeFilter: FilterDefinition = {
  label: "Nature de l'aide",
  defaultOption: 'Toutes',
  options: Object.keys(helpTypes),
  id: 'helpType' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const permanentHelpFilter: FilterDefinition = {
  label: 'Afficher les aides permanentes',
  id: 'isPermanentHelp' as keyof AnyFilters,
  type: 'toggle',
  initialValue: true
};

export const minimumAmountFilter: FilterDefinition = {
  label: 'Montant minimum (en K€)',
  id: 'minimumAmount' as keyof AnyFilters,
  type: 'inputNumber',
  initialValue: 0
};

export const companyIncomeFilter: FilterDefinition = {
  label: "Votre chiffre d'affaires (en K€)",
  id: 'companyIncome' as keyof AnyFilters,
  type: 'inputNumber',
  initialValue: 0
};

export const fundingTypeFilter: FilterDefinition = {
  label: 'Type de financement',
  defaultOption: 'Toutes',
  options: Object.keys(fundingTypes),
  id: 'fundingType' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};
