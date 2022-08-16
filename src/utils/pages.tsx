import Trash from './../assets/icons/trash-fill.svg';
import Star from './../assets/icons/star-fill.svg';

export interface Route {
    key: string,
    path: string,
    name: string,
    icon: JSX.Element
}

export const pages: (Route)[] = [
    // {key: "SELECTION", path: `/profile/ma-selection`, name: "Sélection", icon: <img className="w-5 h-5 m-1" src={Star} alt="Icône d'étoile" />  },
    // {key: "CORBEILLE", path: `/profile/corbeille`, name: "Corbeille",  icon: <img className="w-5 h-5 m-1" src={Trash} alt="Icône de poubelle" /> },
];
