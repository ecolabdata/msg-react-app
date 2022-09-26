/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyCard } from '../api/Api';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const buildUseCategorie =
  (categorie: string) =>
  (): [
    (card: AnyCard) => void,
    (card: AnyCard) => boolean,
    Record<string, AnyCard>,
    (x: Record<string, AnyCard>) => void
  ] => {
    const [cardCategorie, setCardCategorie] = useLocalStorage<Record<string, AnyCard>>(
      categorie,
      {}
    );
    const toggleCategorie = (card: AnyCard) => {
      if (!cardCategorie[card.id]) {
        setCardCategorie(Object.assign({}, cardCategorie, { [card.id]: card }));
      } else {
        delete cardCategorie[card.id];
        setCardCategorie(Object.assign({}, cardCategorie));
      }
    };
    const isCategorie = (card: AnyCard) => {
      return cardCategorie[card.id] != undefined;
    };
    return [toggleCategorie, isCategorie, cardCategorie, setCardCategorie];
  };

export const useFavoris = buildUseCategorie('favori');
export const useCorbeille = buildUseCategorie('corbeille');
export type UsedFavoris = ReturnType<typeof useFavoris>;
export type UsedCorbeille = ReturnType<typeof useCorbeille>;
export const defaultUsedFavoris: UsedFavoris = [
  (card: AnyCard) => {},
  (card: AnyCard) => true,
  {},
  (x: Record<string, AnyCard>) => {}
];
export const defaultUsedCorbeille: UsedCorbeille = [
  (card: AnyCard) => {},
  (card: AnyCard) => true,
  {},
  (x: Record<string, AnyCard>) => {}
];
