import { Startup } from '../api/Api';

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
    lightBackground: 'bg-[#1E2719]'
  },
  '#CE70CC': {
    border: 'border-[#CE70CC]',
    backgroundColor: 'bg-[#CE70CC]',
    lightBackground: 'bg-[#2C202B]'
  },
  '#8585F6': {
    border: 'border-[#8585F6]',
    backgroundColor: 'bg-[#8585F6]',
    lightBackground: 'bg-[#272747]'
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

export const getGreenTechData = (startup: Startup) => {
  if (startup.SOLUTIONS['GreenTech Innovation'] && startup.SOLUTIONS['GreenTech Innovation'][0]) {
    return startup.SOLUTIONS['GreenTech Innovation'][0];
  }
  return null;
};
