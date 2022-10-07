export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const generateNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
