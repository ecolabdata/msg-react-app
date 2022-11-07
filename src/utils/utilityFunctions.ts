export const generateNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const tailwindColorUtility: Record<string, Record<string, string>> = {
  '#D8C635': {
    border: 'border-[#D8C635]',
    backgroundColor: 'bg-[#D8C635]',
    lightBackground: 'bg-[#272419]'
  },
  '#68A532': {
    border: 'border-[#68A532]',
    backgroundColor: 'bg-[#68A532]',
    lightBackground: 'bg-[#68A532]'
  },
  '#CE70CC': {
    border: 'border-[#CE70CC]',
    backgroundColor: 'bg-[#CE70CC]',
    lightBackground: 'bg-[#CE70CC]'
  },
  '#8585F6': {
    border: 'border-[#8585F6]',
    backgroundColor: 'bg-[#8585F6]',
    lightBackground: 'bg-[#8585F6]'
  },
  '#4EC8AE': {
    border: 'border-[#4EC8AE]',
    backgroundColor: 'bg-[#4EC8AE]',
    lightBackground: 'bg-[#15201E]'
  },
  '#F95C5E': {
    border: 'border-[#F95C5E]',
    backgroundColor: 'bg-[#F95C5E]',
    lightBackground: 'bg-[#2D0405]'
  }
};

export const yesNotoBoolean = (value: string) => {
  if (!value) return false;
  const lowerValue = value.toLowerCase();
  if (lowerValue === 'yes' || lowerValue === 'oui') return true;
  return false;
};

export function getDaysBetweenDates(first: Date, second: Date) {
  return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
}

export const departmentsByRegion: Record<string, string[] | number[]> = {
  'Auvergne-Rhône-Alpes': [1, 3, 7, 15, 26, 38, 42, 43, 63, 69, 73, 74],
  'Bourgogne-Franche-Comté': [21, 25, 39, 58, 70, 71, 89, 90],
  Bretagne: [22, 29, 35, 56],
  'Centre-Val de Loire': [18, 28, 36, 37, 41, 45],
  Corse: ['2A', '2B'],
  'Grand Est': [8, 10, 51, 52, 54, 55, 57, 67, 68, 88],
  Guadeloupe: [971],
  Guyane: [973],
  'Hauts-de-France': [2, 59, 60, 62, 80],
  'Île-de-France': [75, 77, 78, 91, 92, 93, 94, 95],
  'La Réunion': [974],
  Martinique: [972],
  Mayotte: [976],
  Normandie: [14, 27, 50, 61, 76],
  'Nouvelle-Aquitaine': [16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87],
  Occitanie: [9, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82],
  'Pays de la Loire': [44, 49, 53, 72, 85],
  "Provence-Alpes-Côte d'Azur": [4, 5, 6, 13, 83, 84]
};
