import MySelection from './../components/authenticated/MySelection';
import WasteBin from './../components/authenticated/WasteBin';
import Logout from './../components/authenticated/Logout';
import Home from './../components/anonymous/Home';
import Authentication from './../components/Authentication';

export interface Route {
    key: string,
    path: string,
    name: string,
    element: React.ReactNode,
    routes?: Route[]
}

export const protectedRoutes: Route[] = [

    {key: "SELECTION", path: "/ma-selection", name: "Sélection", element: MySelection() },
    {key: "CORBEILLE", path: "/corbeille", name: "Corbeille", element: WasteBin() },
    {key: "DECONNEXION", path: "/deconnexion", name: "Déconnexion", element: Logout() },
];

export const unProtectedRoutes: Route[] = [
    
    {key: "CONNEXION", path: "/connexion", name: "Connexion", element: Authentication()},
    {key: "ACCUEIL", path: "/", name: "Accueil", element: Home()},
]